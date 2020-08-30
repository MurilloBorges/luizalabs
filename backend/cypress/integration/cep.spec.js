/* eslint-disable no-underscore-dangle */
/* eslint-disable spaced-comment */
/* eslint-disable no-undef */
/// <reference types="Cypress" />
/// <reference path="../support/commands.js" />

let token = '';

describe('Action busca CEP', () => {
  beforeEach(() => {
    cy.fixture('cep.json').as('cep');
  });

  it('Realizando teste de autenticação', function () {
    cy.request('POST', '/authenticate', {
      email: 'murilloborges@luizalabs.com',
      senha: '123456',
    }).then(response => {
      token = response.body.token;
      expect(response.status).to.eq(200);
    });
  });

  it('Realizando teste de CEP válido', function () {
    const { cep } = this;
    cy.buscaCEP(cep.valid, token);
  });

  it('Realizando teste de CEP válido por troca do último digito da direita por 0', function () {
    const { cep } = this;
    cy.buscaCEP(cep.validByReplace, token);
  });

  it('Realizando teste de CEP inválido', function () {
    const { cep } = this;
    cy.buscaCEP(cep.invalid, token);
  });

  it('Realizando teste de CEP inválido por trocar do último digito da direita por 0', function () {
    const { cep } = this;
    cy.buscaCEP(cep.invalidByReplace, token);
  });
});
