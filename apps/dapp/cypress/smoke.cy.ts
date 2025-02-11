/// <reference types="cypress" />

import { URLS } from "./constants";

// These tests just ensure that none of the pages have been inadvertently broken by any code changes
describe("smoke tests", () => {
  it("renders home page", () => {
    cy.visit(URLS.HOME);
    cy.shouldRenderPageWithId("__AXIS_HOME_PAGE__");
  });

  it("renders create launch page", () => {
    cy.visit(URLS.CREATE_LAUNCH);
    cy.shouldRenderPageWithId("__AXIS_CREATE_LAUNCH_PAGE__");
  });

  it("renders curator page", () => {
    cy.visit(URLS.CURATOR);
    cy.shouldRenderPageWithId("__AXIS_CURATOR_PAGE__");
  });

  it("renders curators page", () => {
    cy.visit(URLS.CURATORS);
    cy.shouldRenderPageWithId("__AXIS_CURATORS_LIST__");
  });

  it("renders launch page", () => {
    cy.visit(URLS.LAUNCH);
    cy.shouldRenderPageWithId("__AXIS_LAUNCH_PAGE__");
  });

  if (Cypress.env("VITE_TESTNET") === "true") {
    it("renders faucet page", () => {
      cy.visit(URLS.FAUCET);
      cy.shouldRenderPageWithId("__AXIS_FAUCET_PAGE__");
    });

    it("renders deploy page", () => {
      cy.visit(URLS.DEPLOY);
      cy.shouldRenderPageWithId("__AXIS_DEPLOY_PAGE__");
    });
  }
});
