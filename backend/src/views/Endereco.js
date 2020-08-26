import cep from 'cep-promise';

class Endereco {
  constructor() {
    this.initial();
  }

  async getEndereco(value) {
    try {
      const response = await cep(value);
      this.endereco = {
        ...this.endereco,
        ...response,
      };
    } catch (error) {
      if (
        error.errors.filter(e => e.message.includes('CEP INVÁLIDO')).length >= 1
      ) {
        this.invalid = true;
      } else {
        this.notFound = true;
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
    this.notFound = false;
    this.invalid = false;
  }
}

export default new Endereco();
