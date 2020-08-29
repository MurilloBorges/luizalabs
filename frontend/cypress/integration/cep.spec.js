/* eslint-disable no-undef */
/// <reference types="Cypress" />
/// <reference types="./../support" />

describe('Action busca CEP', () => {
  beforeEach(() => {
    cy.fixture('usuario.json').as('usuario');
    cy.fixture('cep.json').as('cep');
    // const { usuario } = this;
    cy.visit('/login');
    cy.login('murilloborges@luizalabs.com', '123456');
  });

  it('Realizando testes na funcionalidade de busca CEP', async () => {
    // const { cep } = this;
    cy.log('Testando o CEP válido');
    await cy.dataCyType('cep', '15041530', '15041-530');

    cy.log('Testando o CEP válido por troca do último digito da direita por 0"');
    await cy.dataCyType('cep', '15041222', '15041-222');

    cy.log('Testando o CEP inválido');
    await cy.dataCyType('cep', '99999999', '99999-999');

    cy.log('Testando o CEP válido por trocar do último digito da direita por 0');
    await cy.dataCyType('cep', '15000000', '00000-000');
  });

  afterEach(() => {
    cy.dataCy('deslogar').click();
  });
});
