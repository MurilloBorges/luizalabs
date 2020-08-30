/* eslint-disable no-undef */
// eslint-disable-next-line spaced-comment
/// <reference path="./index.d.ts" />

Cypress.Commands.add('dataCy', value => cy.get(`[data-cy=${value}]`));

Cypress.Commands.add('id', value => cy.get(`[id=${value}]`));

Cypress.Commands.add('name', (elemento, value) => {
  return cy.get(`${elemento}[name="${value}"]`);
});

Cypress.Commands.add('class', value => cy.get(`[class="${value}"]`));

Cypress.Commands.add('href', value => cy.get(`a[href*="${value}"]`));

Cypress.Commands.add('dataCyType', (dataCy, type, value) =>
  cy
    .dataCy(dataCy)
    .clear()
    .type(type)
    .should('have.value', value !== undefined ? value : type)
);

Cypress.Commands.add('dataCySelect', (dataCy, select, value) =>
  cy
    .dataCy(dataCy)
    .select(select)
    .should('have.value', value !== undefined ? value : select)
);

Cypress.Commands.add('login', (userName, password) => {
  cy.log('Entrando na aplicação');
  cy.dataCy('username')
    .type(userName)
    .should('have.value', userName);
  cy.dataCy('password')
    .type(password)
    .should('have.value', password);
  cy.dataCy('entrar').click();
});
