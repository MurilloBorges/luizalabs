/* eslint-disable no-undef */
/// <reference types="Cypress" />
/// <reference path="../support/commands.js" />

describe('Action happy path application', () => {
  beforeEach(() => {
    cy.fixture('usuario.json').as('usuario');
    cy.fixture('cep.json').as('cep');
  });

  it('Realizando teste de autenticação', function () {
    cy.visit('/login');
    const { usuario } = this;
    cy.login(usuario.email, usuario.senha);
  });

  it('Realizando testes na funcionalidade de busca CEP', function () {
    const { cep } = this;
    cy.log('Testando o CEP válido');
    cy.buscaCEP(cep.valid);
  });

  it('Realizando teste de deslogar o usuário', () => {
    cy.log('Testando o deslogar do usuário');
    cy.dataCy('deslogar').click({ force: true });
  });
});
