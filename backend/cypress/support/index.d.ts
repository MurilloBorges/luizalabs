//cria intellisense da função criada no command.js
/// <reference types="Cypress" />
declare namespace Cypress {

	interface Chainable<Subject> {

		/**
		 * Custom command to select DOM element by data-cy attribute.
		 * @example 
		 * cy.dataCy('greeting')
		 */
		dataCy(value: string): Chainable<Element>

		/**
		 * Custom command to select DOM element by name attribute.
		 * @example 
		 * cy.name('input', 'greeting')
		 */
		name(elemento: string, value: string): Chainable<Element>

		/**
		 * Custom command to select DOM element by id attribute.
		 * @example 
		 * cy.id('greeting')
		 */
		id(value: string): Chainable<Element>

		/**
		 * Custom command to select DOM element by class attribute.
		 * @example 
		 * cy.class('greeting')
		 */
		class(value: string): Chainable<Element>

		/**
		 * Custom command to select DOM element by ahref attribute.
		 * @example 
		 * cy.ahref('/evonsaude/meu-plano')
		 */
		ahref(value: string): Chainable<Element>

		/**
		 * Custom command to select the DOM element by the data-cy attribute, assign value and validate.
		 * @example 
		 * cy.dataCyType('greeting', '17992698572', '(17) 99269-8572')
		 */
		dataCyType(dataCy: string, type: string, value: string): Chainable<Element>

		/**
		 * Custom command to select the DOM element by the data-cy attribute, select value and validate.
		 * @example 
		 * cy.dataCySelect('greeting', 'teste', '1')
		 */
		dataCySelect(dataCy: string, select: string, value: string): Chainable<Element>

		/**
		 * Use to login in Acesso Application
		 * @example
		 * cy.login('user name', 'user password')
		 */
		login(userName: string, password: string): Chainable<any>
	}
}