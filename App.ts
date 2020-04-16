import express from 'express';
import http, { Server } from 'http';
import routes from './src/routes';
import bodyParser from 'body-parser';
import * as core from 'express-serve-static-core';
import { config, IAppConfig } from './config';

import ErrnoException = NodeJS.ErrnoException;

class App {
    private app: core.Express = express();
    private server: Server;

    constructor(appConfig: IAppConfig) {
        this.app.set('port', appConfig.port);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
        this.initRoutes();
        this.server = http.createServer(this.app);
        this.initServer(appConfig.port);
    }

    private initServer(port: number) {
        this.server.listen(port);
        this.server
            .on('error', (error: ErrnoException) => this.handleError(error))
            .on('listening', () => this.handleListening());
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
        console.log('Listening on ' + bind); // eslint-disable-line no-console
    }
}

export default new App(config);
