import { Injectable, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { RequestStoreProvider } from './socket-app-io-client/request-store.provider';
import { SocketIoClientProvider } from './socket-app-io-client/socket-io-client.provider';

@Injectable()
export class Boostrap implements OnApplicationBootstrap {
  @Inject(RequestStoreProvider)
  private requestStore: RequestStoreProvider;
  @Inject(SocketIoClientProvider)
  private socketProvider: SocketIoClientProvider;

  onApplicationBootstrap() {
    this.socketProvider.getSocket().onAny((event: string, data, ...other) => {
      if (data && typeof data.requestId === 'string') {
        const requestStored$ = this.requestStore.store.get(data.requestId);
        if (requestStored$) {
          requestStored$.next({
            event,
            data,
          });
        }
      }
    });
  }
}
