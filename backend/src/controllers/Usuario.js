import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario';
import { generateToken } from './Authenticate';
import { isEmpty } from '../helpers/funcoes';

class UsuarioController {
  async index(req, res) {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const usuario = await Usuario.findById(req.params.id);

      if (isEmpty(usuario)) {
        return res.status(404).json();
      }

      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        senha: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const usuarioExistente = await Usuario.findOne({ email: req.body.email });

      if (usuarioExistente) {
        return res
          .status(400)
          .json({ error: 'Já existe uma conta vinculada a este e-mail' });
      }

      const { _id, nome, email } = await Usuario.create(req.body);

      return res.status(201).json({
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

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string(),
        senhaAntiga: Yup.string().min(6),
        senha: Yup.string()
          .min(6)
          .when('senhaAntiga', (senhaAntiga, field) =>
            senhaAntiga ? field.required() : field
          ),
        senhaConfirmacao: Yup.string(6).when('senha', (senha, field) =>
          senha ? field.required().oneOf([Yup.ref('senha')]) : field
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const { senhaAntiga, nome, senha } = req.body;

      const usuario = await Usuario.findById(req.params.id).select('+senha');

      if (isEmpty(usuario)) {
        return res.status(404).json();
      }

      if (senhaAntiga && !(await bcrypt.compare(senhaAntiga, usuario.senha))) {
        return res.status(400).json({ error: 'Senhas não correspondem' });
      }

      await Usuario.findByIdAndUpdate(req.params.id, {
        nome,
        senha,
      });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req, res) {
    try {
      const usuario = await Usuario.findByIdAndDelete(req.params.id);

      if (isEmpty(usuario)) {
        return res.status(404).json();
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new UsuarioController();
