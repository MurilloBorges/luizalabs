import Endereco from '../views/Endereco';
import { isNotEmpty } from '../helpers/funcoes';

class EnderecoController {
  async show(req, res) {
    const { cep } = req.params;
    try {
      await Endereco.getEndereco(cep);

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
