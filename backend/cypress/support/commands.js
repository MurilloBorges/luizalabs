/* eslint-disable no-undef */
// eslint-disable-next-line spaced-comment
/// <reference path="./index.d.ts" />

Cypress.Commands.add('buscaCEP', (cep, token) => {
  cy.request({
    method: 'GET',
    url: `/ceps/${cep.cep}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => {
    if (response.body.error) {
      expect(response.status).to.eq(400);
      expect(response.body.cep).to.eq(cep.cepReturn);
      expect(response.body.error).to.not.eq(cep.cepReturn);
    } else {
      expect(response.status).to.eq(200);
      expect(response.body.cep).to.eq(cep.cepReturn);
      expect(response.body.state).to.eq(cep.state);
      expect(response.body.city).to.eq(cep.city);
      expect(response.body.neighborhood).to.eq(cep.neighborhood);
      expect(response.body.street).to.eq(cep.street);
    }
  });
});
