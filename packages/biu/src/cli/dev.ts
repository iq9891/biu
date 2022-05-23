/** @format */

import webpack from '@fe6/biu-deps-webpack/compiled/webpack';
import { getConfig } from '../shared/wp-chain';
import Server from '../server';

class devServer {
  server?: Server;
  constructor() {}
  async setup() {
    await this.setServer();
    this.setProcess();
  }
  async setServer() {
    const config = getConfig();
    const compiler = webpack(config);
    this.server = new Server(compiler);
    this.server.start();
  }
  setProcess() {
    const { server } = this;
    const sigs = ['SIGINT', 'SIGTERM'];
    sigs.forEach(function (sig) {
      process.on(sig, function () {
        server?.stop();
        process.exit();
      });
    });
    process.on('unhandledRejection', (err) => {
      throw err;
    });
  }
}
export default new devServer();
