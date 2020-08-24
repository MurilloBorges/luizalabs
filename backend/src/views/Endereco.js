module.exports = class Endereco {
  constructor(bairro, cep, cidade, uf, endereco, ibge) {
    this.bairro = bairro;
    this.cep = cep;
    this.cidade = cidade;
    this.uf = uf;
    this.endereco = endereco;
    this.ibge = ibge;
  }
};
