context("App 200 page 9996", () => {
  it("remembers me", () => {
    cy.userLoginSetup(9996);
    const pUserEmail = Cypress.env("userEmail");
    cy.getCy("signup_email").type(pUserEmail);
    cy.getCy("submitButton").click();
    cy.url()
      .should("contain", ":9999:")
      .then($url => {
        cy.visit($url.replace("/__/", "/ords/")); //necessary due to #redirectmalfunction
      });
    cy.get(".t-Alert-title").should("be.visible");
  });
});
