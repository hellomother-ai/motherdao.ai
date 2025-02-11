/// <reference types="cypress" />

Cypress.Commands.add("shouldNotRenderErrorPage", () => {
  // Timeout required because the error page might not appear until the whole page has rendered
  cy.wait(500).get("#__AXIS_ORIGIN_ERROR_PAGE__").should("not.exist");
});

// Generally a test will run faster looking for an expected ID rather than waiting for an error page
Cypress.Commands.add("shouldRenderPageWithId", (id) => {
  cy.get(`#${id}`, { timeout: 10000 }).should("exist");
});
