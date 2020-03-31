import express from 'express';
import http, {Server} from 'http';
import routes from './src/routes';
import ErrnoException = NodeJS.ErrnoException;
import * as core from 'express-serve-static-core';
import { config, IAppConfig } from './config';

class App {
    private app: core.Express = express();
    private server: Server;

    constructor(appConfig: IAppConfig) {
        this.app.set('port', appConfig.port);
        this.initRoutes();
        this.server = http.createServer(this.app);
        this.initServer(appConfig.port);
    }

    private initServer(port: number) {
        this.server.listen(port);
        this.server.on('error', (error: ErrnoException) => this.handleError(error));
        this.server.on('listening', () => this.handleListening());
    }

    private initRoutes() {
        Object.keys(routes).forEach((routeBasePath: string) => {
            this.app.use(`/${routeBasePath}`, routes[routeBasePath]);
        });
    }

    private handleError(error: ErrnoException) {
        throw error;
    }

    private handleListening() {
        const addr = this.server.address()!;
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    }
}

export default new App(config);
