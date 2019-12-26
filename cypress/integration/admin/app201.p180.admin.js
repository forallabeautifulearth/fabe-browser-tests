import {
  getIframeBody,
  getIframeDom,
  closeIframeModal
} from "../../support/utils";

context("test p180", () => {
  const deleteSeq = Cypress._.random(1e6, 2e6).toString();
  // it is a good idea to randomize each item since we use shared backed
  const deleteName = `Delete me (test ${deleteSeq})`;
  const page_number = 180;
  const page_name = "species";
  it("create species", () => {
    cy.adminLoginSetup(page_number);
    cy.get(".t-Body-contentInner").then($filter => {
      var filterCount = $filter.find(".a-IRR-controls-cell--remove").length;
      if (filterCount > 0) {
        cy.get(".a-IRR-controls-cell--remove").click();
        cy.wait("@refresh");
      }
    });
    cy.openCreateModal();
    cy.get("iframe").then(function($iframe) {
      const $body = $iframe.contents().find("body");
      const cyDom1 = cy.wrap($body);
      cyDom1.find("#P181_SPECIES_NAME").type(deleteName);
      const cyDom2 = cy.wrap($body);
      cyDom2.find("#P181_SPECIES_DESCRIPTION").type(deleteName);
      cy.uploadImg($body, page_number + 1);
      cy.submitModal($body);
    });
    getIframeDom()
      .find("[data-cy=cancelButton]")
      .click();
    cy.get("iframe").should("not.exist");
    //cy.scrollTo("top");
    cy.get(".t-HeroRegion-title").should("contain", "Species");
    cy.wait("@refresh");
    cy.get("#species_search_field")
      .type(deleteName + "{enter}")
      .should("have.value", deleteName);
    cy.confirmItem(deleteName, page_name);
  });
});
