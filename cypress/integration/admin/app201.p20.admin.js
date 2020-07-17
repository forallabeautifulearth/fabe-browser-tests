import {
  getIframeBody,
  getIframeDom,
  closeIframeModal
} from "../../support/utils";

context("App 201 (Admin) p20 - Actions", () => {
  const deleteSeq = Cypress._.random(1e6, 2e6).toString();
  // it is a good idea to randomize each item since we use shared backed
  const deleteName = `Delete me (test ${deleteSeq}).`;
  const page_number = 20;
  const page_name = "actions";

  it("Create new Action", () => {
    cy.adminLoginSetup(20);
    cy.openCreateModal(deleteName);

    getIframeDom()
      .find("#P21_NAME")
      .type(deleteName)
      .should("have.value", deleteName);

    getIframeDom()
      .find("#P21_LIFE_POINT_VALUE")
      .type(1);
    //.should("have.value", 1);

    getIframeBody().then(cy.submitModal);

    closeIframeModal();

    cy.get(".a-Toolbar-inputText").type("Delete {enter}");
    cy.confirmItem(deleteName, page_name);
  });
});
