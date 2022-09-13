import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import { appsProviders } from './apps.providers';
import { DatabaseModule } from '../database/database.module';

import { SocketIoListener } from '../socket-app-io-client/socket-io.listener';
import { SocketIoClientProvider } from '../socket-app-io-client/socket-io-client.provider';
import { SocketIoClientProxyService } from '../socket-app-io-client/socket-io-client-proxy/socket-io-client-proxy.service';
@Module({
  imports: [ConfigModule.forRoot(),
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [AppsController],
  providers: [
    AppsService,
    ...appsProviders    ,
    SocketIoClientProvider, 
    SocketIoClientProxyService,
  ],
  exports: [AppsService],
})
export class AppsModule { }
