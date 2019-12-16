context("testing mantras page", () => {
  it("add a row to ig", () => {
    cy.adminLoginSetup(210);
    cy.get("[data-action=selection-add-row]").click();
    cy.get(".is-focused")
      .dblclick()
      .type("test");
    cy.get("td#mantras_ig_grid_vc_cur").type("Delete me test");
    //.should("have.value", "Delete me test")
  });
});
