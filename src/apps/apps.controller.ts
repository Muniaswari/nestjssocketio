import { Controller, UseGuards, Get, Post, Put, Query, Delete, Body, Param } from '@nestjs/common';
import { AppsDto } from './dto/apps.dto';
import { AppsService } from './apps.service';
import { controllers } from '../shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Apps } from './interfaces/apps.interface';
import { Paging } from 'src/shared/paging';
import { processPageInput } from '../shared/common';
import { SocketIoClientProxyService } from '../socket-app-io-client/socket-io-client-proxy/socket-io-client-proxy.service';

@ApiTags(controllers.appscontroller)
@Controller(controllers.appscontroller)
export class AppsController {
  constructor(private readonly appsService: AppsService,
    private readonly socketIoClientProxyService: SocketIoClientProxyService) { }

  @Get()
  async findAll(): Promise<Apps[]> {
    return this.appsService.findAll();
  }

  // @Get('test-emit')
  // testEmitAction() {
  //   console.log("test-emit");
  //   this.socketIoClientProxyService.emit(
  //     'greeting',
  //     'Greeting from action test-emit',
  //   );
  //   return 'ok';
  // }


  // @Get('test-send')
  // testSendAction() {
  //   this.socketIoClientProxyService
  //     .send('greeting', 'Greeting from action test-emit')
  //     .subscribe((rs) => {
  //       console.log('after send', rs);
  //     });
  //   return 'ok';
  // }
}
