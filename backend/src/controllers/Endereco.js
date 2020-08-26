import Endereco from '../views/Endereco';
import { replaceAt } from '../helpers/funcoes';

class EnderecoController {
  async show(req, res) {
    let cep = req.params.cep.replace(/\D/g, '');
    try {
      if (cep.length !== 8) {
        return res.status(400).json({
          cep,
          error: 'CEP inválido',
        });
      }

      let cont = 7;
      do {
        if (Endereco.notFound) {
          Endereco.initial();
          cep = replaceAt(cep, cont, '0');
          cont -= 1;
        }

        // eslint-disable-next-line no-await-in-loop
        await Endereco.getEndereco(cep);

        console.log('notfound', Endereco.notFound, cep);
      } while (Endereco.notFound && cont >= 0);

      if (Endereco.notFound) {
        return res.status(404).json({
          cep,
          error: 'CEP não encontrado',
        });
      }

      if (Endereco.invalid) {
        return res.status(400).json({
          cep,
          error: 'CEP inválido',
        });
      }

      return res.json(Endereco.endereco);
    } catch (error) {
      return res.status(500).json({ error });
    } finally {
      Endereco.initial();
    }
  }
}

export default new EnderecoController();
