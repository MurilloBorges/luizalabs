/* eslint-disable no-undef */
/// <reference types="Cypress" />
/// <reference path="../support/commands.js" />

describe('gerando cotação e adesão com sucesso', () => {
  beforeEach(() => {
    cy.fixture('users.json').as('users');
  });

  it('entrando na homepage', () => {
    cy.entrandoHome();
  });

  it('fazendo login com e-mail já cadastrado', () => {
    const user = this.users;
    cy.login(user);
  });

  it('entrando na página da cotação', () => {
    const user = this.users;
    cy.entraCotacao(user);
  });

  it('preenchendo campos e gerando cotação', () => {
    const user = this.users;
    cy.geraCotacao(user);
  });

  it('escolhendo plano', () => {
    const user = this.users;
    cy.escolhePlano(user);
  });

  it('completando dados da fase 1 da adesão', function () {
    const user = this.users;
    cy.confirmaDados(user);
  });

  it('preenchendo formulário titular e dependente na fase 2 da adesão', function () {
    const user = this.users;
    cy.preencheForms(user);
  });

  it('preenchendo declaração de saúde titular e dependente na fase 3 da adesão', () => {
    cy.declaraSaude();
  });

  it('optando por enviar documentos em outro momento, fase 4 da adesão', () => {
    cy.envioDocumentos();
  });

  it('lendo resumo da proposta e confirmando solicitação na fase 5 da adesão', function () {
    const user = this.users;
    cy.aceitaCondicoes(user);
  });
});
