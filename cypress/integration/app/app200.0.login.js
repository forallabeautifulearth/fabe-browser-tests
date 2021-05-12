context("App 200 login test", () => {
  const loginPage = "/f?p=200:LOGIN";

  describe("Testing login functionality", () => {
    const pUserEmail = Cypress.env("userEmail");
    const pPassword = Cypress.env("userPassword");
    beforeEach(() => {
      // sanity check - did we pass the login info
      // via cypress.json and environment variables?!
      expect(pUserEmail, "user email").to.be.a("string").and.be.not.empty;
      expect(pPassword, "user password").to.be.a("string").and.be.not.empty;

      cy.clearCookies();
      cy.server();
      cy.route("POST", "/ords/wwv_flow.accept").as("login");
      cy.visit(loginPage);
      // cy.openWindow(loginPage)
      cy.clearCookie("LOGIN_USERNAME_COOKIE");
      cy.getCy("login_email")
        .clear({ force: true })
        .should("be.empty");
      //for reasons that I can't explain, this causes the page to reload and we need to grab the element again
      cy.wait(500);
      cy.getCy("login_email")
        .clear({ force: true })
        .should("be.empty")
        .type(pUserEmail, { force: true });
    });

    it("plain login", () => {
      cy.getCy("password")
        .clear({ force: true })
        .should("be.empty")
        .type(pPassword, { force: true })
        .should("have.value", pPassword);
      cy.getCy("sign_inButton").click();
      //cy.wait(["@login"]);
      //cy.url()
      //  .should("contain", ":10:")
      //  .then($url => {
      //    cy.visit($url.replace("/__/", "/ords/")); //necessary due to #redirectmalfunction
      //  });
      cy.wait(500);
      cy.get("[data-cy=back_to_evryButton]").click();

      //cy.url().should("contain", ":50:");

      cy.get(".apex-logo-img").should("exist");
    });

    it("wrong password", () => {
      const badPassword = "blerg";
      cy.getCy("password")
        .clear()
        .should("be.empty")
        .type(badPassword)
        .should("have.value", badPassword);

      // unsuccessful login changes url
      // let's confirm this
      cy.url()
        .should("include", "200:LOGIN")
        .then(url => {
          console.log("url before sign in", url);
        });
      cy.getCy("sign_inButton").click();
      // the user can close the login error alert
      cy.get(".mdc-snackbar--open")
        .should("be.visible")
        .should("contain.text", "Invalid Login")
        .find("button.e-Notification--close.mdc-icon-button")
        .click();
      // the login error disappears when users clicked the close button
      cy.get(".mdc-snackbar--open").should("not.exist");
    });
  });

  it("Testing login visuals", () => {
    // Load the page or perform any other interactions with the app.
    cy.visit(loginPage)
      .contains("or sign in using email")
      .should("be.visible");

    // Take a snapshot for visual diffing
    cy.percySnapshot();
  });
});
