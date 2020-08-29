/// <reference path="./index.d.ts" />

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('id', (value) => {
	return cy.get(`[id=${value}]`);
});

Cypress.Commands.add('name', (elemento, value) => {
	return cy.get(`${elemento}[name="${value}"]`);
});

Cypress.Commands.add('class', (value) => {
	return cy.get(`[class="${value}"]`);
});

Cypress.Commands.add('href', (value) => {
	return cy.get(`a[href*="${value}"]`);
});

Cypress.Commands.add('dataCyType', (dataCy, type, value) => {
	return cy.dataCy(dataCy).clear().type(type).should('have.value', value !== undefined ? value : type);
});

Cypress.Commands.add('dataCySelect', (dataCy, select, value) => {
	return cy.dataCy(dataCy).select(select).should('have.value', value !== undefined ? value : select);
});

Cypress.Commands.add('login', (userName, password) => {
	cy.log('Entrando na aplicação');
	cy.dataCy('username').type(userName).should('have.value', userName);
	cy.dataCy('password').type(password).should('have.value', password);
	cy.dataCy('entrar').click();
});
