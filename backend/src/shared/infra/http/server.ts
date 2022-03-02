import "reflect-metadata";
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import router from './routes/index.routes';
import AppError from '@shared/errors/AppError';
import { limiter } from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

class App {
    app: express.Application
    port = process.env.PORT || 8081

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.listen();
    }
    
    private middlewares() {
        this.app.use(cors());
        this.app.use(limiter);
    }
    
    private routes() {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use('/files', express.static('uploads/'));
        this.app.use(router);
        this.app.use(errors());
        this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            if(error instanceof AppError) {
                return res.status(error.statusCode).json({
                    status: 'error',
                    message: error.message,
                });
            }

            return res.status(500).json({
                status: 'error',
                error: 'Internal Server Error',
                message: error.message,
            });
        })
    }

    private listen() {
        this.app.listen(this.port, () => console.log("Iniciado"));
    }
}

new App();