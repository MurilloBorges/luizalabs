import jwt from 'jsonwebtoken';
import logger from './logger';
import authConfig from '../config/auth';

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      logger.info('Retorno: Token não fornecido');
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
      logger.info('Retorno: Token error');
      return res.status(401).json({ error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      logger.info('Retorno: Token mal formatado');
      return res.status(401).json({ error: 'Token mal formatado' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        logger.info('Retorno: Token inválido');
        return res.status(401).json({ error: 'Token inválido' });
      }
      req.idUsuario = decoded.id;
      return next();
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
