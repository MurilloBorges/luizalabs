/* eslint-disable no-underscore-dangle */
/* eslint-disable spaced-comment */
/* eslint-disable no-undef */
/// <reference types="Cypress" />
/// <reference path="../support/commands.js" />

let token = '';
let _id = '';

describe('Action happy path application', () => {
  beforeEach(() => {
    cy.fixture('usuario.json').as('usuario');
    cy.fixture('cep.json').as('cep');
  });

  it('Acessando endpoint da documentação', function () {
    cy.visit('/api-docs');
  });

  it('Realizando teste de cadastro de usuário', function () {
    const { usuario } = this;
    cy.request('POST', '/usuarios', {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
    }).then(response => {
      expect(response.status).to.eq(201);
    });
  });

  it('Realizando teste de autenticação', function () {
    const { usuario } = this;
    cy.request('POST', '/authenticate', {
      email: usuario.email,
      senha: usuario.senha,
    }).then(response => {
      token = response.body.token;
      _id = response.body.usuario._id;
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

  it('Realizando teste de exclusão de usuário', function () {
    cy.request({
      method: 'DELETE',
      url: `/usuarios/${_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      expect(response.status).to.eq(204);
    });
  });
});
