context("App 201 (Reader)", () => {
  const readerUsername = Cypress.env("adminReaderUsername");

  it("Impact Areas", () => {
    cy.adminLoginSetup(130, readerUsername);
    cy.getCy("createButton").should("not.exist");
  });

  it("Action Categories", () => {
    cy.adminLoginSetup(10, readerUsername);
    cy.getCy("createButton").should("not.exist");
  });

  it("Actions", () => {
    cy.adminLoginSetup(20, readerUsername);
    cy.getCy("createButton").should("not.exist");
  });
});
