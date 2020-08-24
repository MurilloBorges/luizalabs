import { Router } from 'express';

import Usuario from './controllers/Usuario';
import authMiddleware from './middlewares/auth';
import Authenticate from './controllers/Authenticate';
import Endereco from './controllers/Endereco';

const routes = new Router();

routes.get('/usuarios', Usuario.index);
routes.get('/usuarios/:id', Usuario.show);
routes.post('/usuarios', Usuario.store);

routes.post('/authenticate', Authenticate.store);
routes.use(authMiddleware);

routes.delete('/usuarios/:id', Usuario.delete);
routes.patch('/usuarios/:id', Usuario.update);
routes.get('/cep/:cep', Endereco.show);

export default routes;
