import io, { Socket } from 'socket.io-client';

export class SocketModule {
  private static instance: SocketModule;

  private io: Socket;
  private listeners = new Map<string, any>();

  constructor(uri: string) {
    this.io = io(uri);
    this.registerDefaultListeners();
  }

  public static connect() {
    if (SocketModule.instance) return SocketModule.instance;

    SocketModule.instance = new SocketModule('ws://localhost:3008');

    return SocketModule.instance;
  }

  private registerDefaultListeners() {
    console.log(this.io);
  }

  public registerListener(
    namespace: string,
    event: string,
    cb: (...args: any) => void
  ) {
    if (this.listeners.has(`${namespace}/${event}`)) return;

    this.io.on(event, cb);
    this.listeners.set(`${namespace}/${event}`, cb);
  }

  public removeListener(namespace: string, event: string) {
    if (!this.listeners.has(`${namespace}/${event}`)) return;

    this.io.removeListener(event);
    this.listeners.delete(`${namespace}/${event}`);
  }
}
