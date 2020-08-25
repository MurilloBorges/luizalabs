import cep from 'cep-promise';

class Endereco {
  constructor() {
    this.initial();
  }

  async getEndereco(value) {
    try {
      const response = await cep(value);
      this.endereco = response;
    } catch (error) {
      if (
        error.errors.filter(e => e.message.includes('CEP INVÁLIDO')).length >= 1
      ) {
        throw error;
      } else {
        this.error = 'CEP não encontrado';
      }
    }
  }

  initial() {
    this.endereco = {
      cep: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
    };
    this.error = '';
  }
}

export default new Endereco();
