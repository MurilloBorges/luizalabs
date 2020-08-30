//cria intellisense da função criada no command.js
/// <reference types="Cypress" />
declare namespace Cypress {
	interface Chainable<Subject> {
		/**
		 * Use to search and test the zip code
		 * @example
		 * cy.buscaCEP(cep, token)
		 */
		buscaCEP(cep: object, token: string): Chainable<any>
	}
}
