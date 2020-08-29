/// <reference types="Cypress" />
/// <reference types="./../support" />

describe('Action Produto', () => {

  beforeEach(() => {      
    cy.visit('/login');      
    cy.login('squads', 'squads');    
  });
    
  it('Cadastrando Produto', () => {
    cy.log('Testando o cadastro de produto');            
    cy.dataCy('btn-cadastrar').click();    
    cy.dataCyType('input-nome', 'Chave');
    cy.dataCyType('input-descricao', 'Chave teste 1');
    cy.dataCyType('input-valor', '14.99');
    cy.dataCy('btn-salvar').click();
    cy.dataCy('btn-voltar').click();
    //cy.dataCy('btn-pesquisar').click();
  });

  it('Alterando Produto', () => {
    cy.log('Testando a alteração de produto');            
    cy.dataCy('btn-editar').click();        
    cy.dataCyType('input-descricao', 'Chave teste alteração 1');
    cy.dataCyType('input-valor', '22.50');
    cy.dataCy('btn-salvar').click();
    cy.dataCy('btn-voltar').click();
    //cy.dataCy('btn-pesquisar').click();
  });
})