import Endereco from '../views/Endereco';
import { isNotEmpty, replaceAt } from '../helpers/funcoes';

class EnderecoController {
  async show(req, res) {
    let cep = req.params.cep.replace(/\D/g, '');
    try {
      await Endereco.getEndereco(cep);

      if (isNotEmpty(Endereco.error)) {
        let cont = 7;
        do {
          Endereco.initial();
          cep = replaceAt(cep, cont, '0');
          cont -= 1;
          // eslint-disable-next-line no-await-in-loop
          await Endereco.getEndereco(cep);
        } while (isNotEmpty(Endereco.error) && cont >= 0);
      }

      if (isNotEmpty(Endereco.error)) {
        return res.status(404).json({ error: Endereco.error });
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
