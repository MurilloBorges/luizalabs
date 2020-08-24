import app from './app';
import logger from './middlewares/logger';

app.listen(3333, () => {
  logger.info('Server runing');
  console.log('Servidor está rodando na porta: 3333');
});
