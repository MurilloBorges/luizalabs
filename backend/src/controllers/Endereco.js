import axios from 'axios';
import Endereco from '../views/Endereco';
import 'dotenv/config';
// import { isEmpty } from '../helpers/funcoes';

class EnderecoController {
  async show(req, res) {
    const api = axios.create({
      responseType: 'json',
      headers: {
        Accept: 'application/json',
        ContentType: 'application/json',
      },
    });

    try {
      const { bairro, cep, cidade, uf, endereco, ibge } = await api.get(
        `https://webmaniabr.com/api/1/cep/${req.params.cep}/?app_key=${process.env.APP_KEY_API}&app_secret=${process.env.APP_SECRET_API}`
      );

      // if (isEmpty(end)) {
      //   return res.status(404).json();
      // }

      const localidade = new Endereco(bairro, cep, cidade, uf, endereco, ibge);

      return res.json(localidade);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new EnderecoController();