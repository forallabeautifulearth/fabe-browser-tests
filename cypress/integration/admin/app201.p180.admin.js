import {
  getIframeBody,
  getIframeDom,
  closeIframeModal
} from "../../support/utils";

context("test p180", () => {
  const deleteSeq = Cypress._.random(1e6, 2e6).toString();
  // it is a good idea to randomize each item since we use shared backed
  const deleteName = `Delete me (test ${deleteSeq})`;
  const page_number = 20;
  const page_name = "actions";
  it("create species", () => {
    cy.adminLoginSetup(180);
    cy.openCreateModal(deleteName);
    getIframeDom()
      .find("#P181_SPECIES_NAME")
      .type(deleteSeq)
      .should("have.value", deleteSeq);
  });
});
