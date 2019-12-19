context("testing mantras page", () => {
  it("add a row to ig", () => {
    cy.adminLoginSetup(210);

    // cy.contains("button", "Reset").click();

    cy.get("[data-action=selection-add-row]").click();

    const label = "Test action " + Cypress._.random(1e6);

    cy.focused()
      .should("have.class", "apex-item-text")
      .type(label)
      .blur();

    cy.contains("button", "Save").click();
    cy.get("#mantras_ig_toolbar_search_field").type(label + "{enter}");
    // cy.pause();
    // cy.get("td#mantras_ig_grid_vc_cur").type("Delete me test");
    //.should("have.value", "Delete me test")
  });
});
