context("testing mantras page", () => {
  const page_name = "mantra";
  it("add a row to ig", () => {
    cy.adminLoginSetup(210);
    cy.get("[data-action=reset-report]").then($btn => {
      var disAttr = $btn.attr("disabled");
      if (disAttr == "disabled") {
        console.log("disabled");
      } else {
        console.log("not disabled");
        cy.contains("button", "Reset").click();
        cy.wait("@refresh");
        cy.get("body").then($body => {
          console.log($body);
        });
        //cy.get(".js-confirmBtn").click();
      }
    });
    cy.scrollTo("top");
    cy.get("[data-action=selection-add-row]").click();
    cy.scrollTo("top");
    const label = "Test action " + Cypress._.random(1e6);

    cy.focused()
      .should("have.class", "apex-item-text")
      .type(label)
      .blur();

    cy.contains("button", "Save").click();
    cy.get("#mantras_ig_toolbar_search_field").type(label + "{enter}");
    cy.confirmItem(label, page_name);
  });
});
