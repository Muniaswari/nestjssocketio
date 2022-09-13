import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppsModule } from './apps/apps.module';
//import { EventsModule } from './events/events.module';
import { TransformInterceptor } from './security/transform.interceptor';
import { Boostrap } from './boostrap';
import { RequestStoreProvider } from './socket-app-io-client/request-store.provider';

import { SocketIoListener } from './socket-app-io-client/socket-io.listener';
import { SocketIoClientProvider } from './socket-app-io-client/socket-io-client.provider';
import { SocketIoClientProxyService } from './socket-app-io-client/socket-io-client-proxy/socket-io-client-proxy.service';

import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
@Module({
  imports: [ ConfigModule.forRoot(),
   //EventsModule,
    AppsModule
  ],
  controllers: [AppController, SocketIoListener],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // }  , 
    AppService,
    SocketIoClientProvider,  SocketIoClientProxyService,
    RequestStoreProvider,
    Boostrap,      
  ],
})
export class AppModule { }
