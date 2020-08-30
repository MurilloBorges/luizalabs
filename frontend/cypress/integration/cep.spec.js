/* eslint-disable no-undef */
/// <reference types="Cypress" />
/// <reference types="./../support" />

describe('Action busca CEP', () => {
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

    cy.log('Testando o CEP válido por troca do último digito da direita por 0"');
    cy.buscaCEP(cep.validByReplace);

    cy.log('Testando o CEP inválido');
    cy.buscaCEP(cep.invalid);

    cy.log('Testando o CEP válido por trocar do último digito da direita por 0');
    cy.buscaCEP(cep.invalidByReplace);
  });

  it('Realizando teste de deslogar o usuário', () => {
    cy.log('Testando o deslogar do usuário');
    cy.dataCy('deslogar').click({ force: true });
  });
});
