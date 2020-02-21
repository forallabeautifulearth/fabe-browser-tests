context("App 201 (Admin) login", () => {
  const loginPage = "/f?p=201:LOGIN_DESKTOP";
  const pUsername = Cypress.env("adminUsername");
  const pPassword = Cypress.env("adminPassword");

  beforeEach(() => {
    // sanity check - did we pass the login info
    // via cypress.json and environment variables?!
    expect(pUsername, "admin username").to.be.a("string").and.be.not.empty;
    expect(pPassword, "admin password").to.be.a("string").and.be.not.empty;

    cy.server();
    cy.route("POST", "/ords/wwv_flow.accept").as("login");
    cy.visit(loginPage);
    cy.clearCookie("LOGIN_USERNAME_COOKIE");
    cy.getCy("username")
      .clear()
      .should("be.empty")
      .type(pUsername)
      .should("have.value", pUsername);
  });

  it("plain login", () => {
    cy.getCy("password")
      .clear()
      .should("be.empty")
      .type(pPassword)
      .should("have.value", pPassword);
    cy.getCy("sign_inButton").click();
    cy.wait(["@login"]);
    cy.url().should("contain", ":1:");
  });

  it("wrong password", () => {
    const badPassword = "blerg";
    cy.getCy("password")
      .clear()
      .should("be.empty")
      .type(badPassword)
      .should("have.value", badPassword);
    cy.getCy("sign_inButton").click();
    cy.wait("@login");
    cy.url()
      .should("contain", ":9999:")
      .then($url => {
        cy.visit($url.replace("/__/", "/ords/"));
      });

    cy.get(".t-Alert-content").should("be.visible");
  });
});
