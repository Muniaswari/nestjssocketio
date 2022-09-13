import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { schemalist } from '../shared/constants';
import { Apps } from './interfaces/apps.interface';
import { connect } from 'nats';

@Injectable()
export class AppsService {
  constructor(
    @Inject(schemalist.appsschema)
    private readonly appsModel: Model<Apps>
  ) { }

  name(data:any) {
    console.log(data)
  }

  async findAll(): Promise<Apps[]> {
//     const io = require('socket.io')();
//     const nats = require('nats');

//     const servers = ['nats://localhost:4222'];

// // Randomly connect to a server in the cluster group.
// const ncconnect = nats.connect({'servers': servers});

// // currentServer is the URL of the connected server.
// console.log("Connected to " + ncconnect.currentServer.host);

// const adapter = require('socket.io-nats');

// io.adapter(adapter({ nc: ncconnect }));
// const msg1 = await ncconnect.request("get.library.books",this.name);
// console.log("msg1: ", msg1);


    // const nc = await connect({
    //   servers: ["nats://localhost:4222"],
    // });
  
    // const msg = await nc.request("get.library.books",this.name);
    // console.log("msg: ", msg);
  
    return await this.appsModel.find().exec();
  }
}