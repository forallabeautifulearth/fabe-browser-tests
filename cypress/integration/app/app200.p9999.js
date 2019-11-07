context("App 200 page 9999", () => {
  it("remembers me", () => {
    cy.userLoginSetup(9999);
    const pUserEmail = Cypress.env("userEmail");
    cy.getCy("login_email").should("have.value", pUserEmail);
  });
});
