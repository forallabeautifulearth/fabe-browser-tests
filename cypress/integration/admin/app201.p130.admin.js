import {
  getIframeBody,
  getIframeDom,
  closeIframeModal
} from "../../support/utils";

context("App 201 (Admin) p130 - Impact Areas", () => {
  const deleteSeq = Cypress._.random(1e6, 2e6).toString();
  // it is a good idea to randomize each item since we use shared backed
  const deleteName = `Delete me (test ${deleteSeq})`;
  const page_number = 130;
  const page_name = "impact-areas";

  it("Create new Impact Area", () => {
    cy.adminLoginSetup(130);
    cy.openCreateModal(deleteName);

    //getIframeBody().then($body => {
    //  cy.uploadImg($body, page_number + 1);
    //});

    getIframeDom()
      .find("#P131_SEQUENCE")
      .type(deleteSeq)
      .should("have.value", deleteSeq);

    getIframeDom()
      .find("#P131_NAME")
      .type(deleteName)
      .should("have.value", deleteName);

    getIframeDom()
      .find("#P131_DESCRIPTION")
      .type(deleteName, { force: true })
      .should("have.value", deleteName);
    //cy.screenshot("created new item");

    getIframeBody().then(cy.submitModal);
    //cy.screenshot("submitted new item");

    closeIframeModal();

    cy.get("#impact-areas_search_field").type("Delete {enter}");
    cy.confirmItem(deleteName, page_name);
  });
});
