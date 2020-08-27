context("App 201 (Admin) p10 - Action Categories", () => {
  const deleteSeq = Cypress._.random(1e6, 2e6).toString();
  // it is a good idea to randomize each item since we use shared backed
  const deleteName = `Delete me (test ${deleteSeq})`;
  const page_number = 10;
  const page_name = "action_categories";

  it("Create new Action Category", () => {
    cy.adminLoginSetup(page_number);
    //cy.verifyNotThere(deleteName);
    cy.openCreateModal();
    cy.get("iframe").then(function($iframe) {
      const $body = $iframe.contents().find("body");
      const cyDom = cy.wrap($body);
      cyDom.find("#P11_SEQUENCE").type(deleteSeq);
      const cyDom1 = cy.wrap($body);
      cyDom1.find("#P11_NAME").type(deleteName);
      const cyDom2 = cy.wrap($body);
      cyDom2.find("#P11_DESCRIPTION").type(deleteName, { force: true });
      //cy.uploadImg($body, page_number + 1);
      cy.submitModal($body);
    });
    cy.get("iframe").then(function($iframe) {
      cy.closeModal($iframe);
    });
    cy.wait(1000);
    cy.get("#action_categories_search_field").type("Delete {enter}");
    cy.confirmItem(deleteName, page_name);
  });
});
