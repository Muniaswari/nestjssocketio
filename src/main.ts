import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication, } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger, LoggerService } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import csurf from 'csurf';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { OutboundMessageExternalSerializer } from './common/serializers/outbound-message-external.serializer';
import { InboundResponseExternalDeserializer } from './common/deserializers/inbound-response-external.deserializer';
import morgan from 'morgan';
import path = require('path');
import fs = require('fs');
import rfs = require('rotating-file-stream');
import fmp from 'fastify-multipart';
import { EventLogInterceptor } from './shared/eventLogInterceptor';
import { WsAdapter } from '@nestjs/platform-ws';
import { SocketIoClientStrategy } from './socket-app-io-client/socket-io-client.strategy';
import { SocketIoClientProvider } from './socket-app-io-client/socket-io-client.provider';
declare const module: any;

// export class AppLogger implements LoggerService {
//   log(message: string) { }
//   error(message: string, trace: string) { }
//   warn(message: string) { }
//   debug(message: string) { }
//   verbose(message: string) { }
// }

async function bootstrap() {
  // // const fastifyAdapter = new FastifyAdapter({http2:true});
  // const fastifyAdapter = new FastifyAdapter();
  // // Fastify Multer for files/images upload
  // // fastifyAdapter.register(multer.contentParser);
  // fastifyAdapter.register(fmp);
  // // fastifyAdapter.register(fmp, { attachFieldsToBody: true });
  // // fastifyAdapter.register(fmp,{
  // //   limits: {
  // //     fieldNameSize: 100, // Max field name size in bytes
  // //     fieldSize: 1000000, // Max field value size in bytes
  // //     fields: 10,         // Max number of non-file fields
  // //     fileSize: 100,      // For multipart forms, the max file size
  // //     files: 1,           // Max number of file fields
  // //     headerPairs: 2000,   // Max number of header key=>value pairs
  // //   },
  // // });





  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    //fastifyAdapter,
    { logger: true },
  );  
  
  const socketIoClientProvider = app.get<SocketIoClientProvider>(
    SocketIoClientProvider,
  ); 
  
 // app.useWebSocketAdapter(new WsAdapter(app));
  // Microservices implementation
  app.connectMicroservice({
    strategy: new SocketIoClientStrategy(socketIoClientProvider.getSocket()),
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
      /**
       * Use the "External" (de)serializers for transforming messages to/from
       * an external requestor
      //  */
      // serializer: new OutboundMessageExternalSerializer(),
      // deserializer: new InboundResponseExternalDeserializer(),
    },
  });
  await app.startAllMicroservicesAsync();
  // Microservices implementation end
  //app.use(new EventLoggerMiddleware);
  //ceptor());
  app.setGlobalPrefix('/api');
  app.enableCors();
  app.use(compression());
  app.use(helmet());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  let logDirectory = path.join(__dirname, 'log');
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  let date = new Date();
  let filenam = 'log' + date.toLocaleDateString().replace(/\//g, '_') + '.log';
  var accessLogStream = rfs.createStream(filenam, {
    interval: '1d', // rotate daily
    path: logDirectory,
  });
  //morgan.format('logFormat', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
  app.use(
    morgan('combined', {
      stream: accessLogStream,
    }),
  );
  //app.useGlobalGuards(new RolesGuard());

  // app.use(csurf());

  // Need to impletment the rateLimit option - below
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, disableErrorMessages: false }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  const options = new DocumentBuilder()
    .setTitle('Techbilla Platform')
    .setDescription('The low code development platform API description')
    .setVersion('1.0')
    .addTag('Platform APIs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(2021, '0.0.0.0');
  Logger.log('Socket is running...');
}
bootstrap();
