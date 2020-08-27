import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Usuario from '../models/Usuario';
import authConfig from '../config/auth';

export function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
}

class AuthenticateController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        senha: Yup.string()
          .min(6)
          .required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ email }).select('+senha');

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não cadastrado' });
      }

      if (senha && !(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(400).json({ error: 'Senha inválida' });
      }

      usuario.senha = undefined;

      const { _id, nome } = usuario;

      return res.json({
        usuario: {
          _id,
          nome,
          email,
        },
        token: generateToken({ id: _id }),
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new AuthenticateController();
