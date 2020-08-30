/* eslint-disable no-undef */
/// <reference path="./index.d.ts" />

Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy=${value}]`));

Cypress.Commands.add('id', (value) => cy.get(`[id=${value}]`));

Cypress.Commands.add('name', (elemento, value) => cy.get(`${elemento}[name="${value}"]`));

Cypress.Commands.add('class', (value) => cy.get(`[class="${value}"]`));

Cypress.Commands.add('href', (value) => cy.get(`a[href*="${value}"]`));

Cypress.Commands.add('dataCyType', (dataCy, type, value) => cy.dataCy(dataCy).clear().type(type).should('have.value', value !== undefined ? value : type));

Cypress.Commands.add('dataCySelect', (dataCy, select, value) => cy.dataCy(dataCy).select(select).should('have.value', value !== undefined ? value : select));

Cypress.Commands.add('login', (userName, password) => {
  cy.log('Entrando na aplicação');
  cy.dataCy('email').type(userName).should('have.value', userName);
  cy.dataCy('senha').type(password).should('have.value', password);
  cy.dataCy('entrar').click();
});

Cypress.Commands.add('buscaCEP', (cep) => {
  cy.dataCyType('cep', cep.cep, `${cep.cep.substring(0, 5)}-${cep.cep.slice(-3)}`);
  cy.dataCy('spinner').then(($loader) => {
    if (!$loader) {
      cy.dataCy('cep').should('have.value', `${cep.cepRetorno.substring(0, 5)}-${cep.cepRetorno.slice(-3)}`);
      cy.dataCy('cidade').should('have.value', cep.cidade);
      cy.dataCy('estado').should('have.value', cep.estado);
      cy.dataCy('logradouro').should('have.value', cep.logradouro);
      cy.dataCy('bairro').should('have.value', cep.bairro);
    }
  });
});
