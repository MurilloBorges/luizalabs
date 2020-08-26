import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import logger from './middlewares/logger';
import routes from './routes';
import './database';
import { swaggerUi, swaggerDocs } from './middlewares/swagger';

class App {
  constructor() {
    this.server = express();

    this.cors();
    this.middlewares();
    this.routes();
  }

  cors() {
    this.server.use(cors());
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      morgan(
        '":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"',
        { stream: logger.stream }
      )
    );

    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
