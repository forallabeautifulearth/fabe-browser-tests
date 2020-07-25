context("App 200 page 9991 - sign up", () => {
  const pUserEmail = Cypress.env("userEmail");
  const pUserEmail2 = "fake@fab.earth";
  const deleteName = "Delete me (test)";
  const thePassword = "Cypress123";

  /**
   * Little utility to type into a field with data-cy attribute
   */
  const typeCy = (field, value, labelSelector) => {
    if (labelSelector) {
      // active label means it moved out of the input element
      // and then we can clear the input element normally
      cy.get(labelSelector).click({ force: true });
    }

    cy.getCy(field)
      .clear()
      .should("be.empty")
      .type(value, { force: true })
      .should("have.value", value);
  };
  before(function() {
    cy.request("/website/test/seed_data/");
  });

  beforeEach(() => {
    // visit the page and make sure the XHR has finished
    // to avoid typing before the DOM is ready
    cy.server();
    //cy.route("POST", "/ords/wwv_flow.ajax").as("flow");//this xhr request doesn't seem to occur
    cy.visit("/f?p=200:9991:1:::::"); //.wait("@flow");
    cy.contains("Join fabe").should("be.visible");

    cy.getCy("username")
      .clear({ force: true })
      .should("be.empty");
    //for reasons that I can't explain, this causes the page to reload and we need to grab the element again
    cy.wait(500);
    cy.getCy("username")
      .clear({ force: true })
      .should("be.empty")
      .type(pUserEmail, { force: true })
      .should("have.value", pUserEmail);
    typeCy("signup_first_name", deleteName, "#P9991_SIGNUP_FIRST_NAME_LABEL");
    typeCy("signup_last_name", deleteName, "#P9991_SIGNUP_LAST_NAME_LABEL");
    typeCy("password", thePassword, "#P9991_SIGNUP_PASSWORD_LABEL");
  });

  it("user already registered error", () => {
    typeCy("signup_email", pUserEmail, "#P9991_SIGNUP_EMAIL_LABEL");
    cy.get("[data-cy=submitButton]").click();
    //cy.contains(".t-Alert", "already registered").should("exist");
    //
    //cy.percySnapshot();
  });

  it.only("successful signup", () => {
    typeCy("signup_email", pUserEmail2, "#P9991_SIGNUP_EMAIL_LABEL");
    cy.get("[data-cy=submitButton]").click();

    cy.url()
      .should("include", "NO:RP")
      .then($url => {
        cy.visit($url.replace("/__/", "/ords/")); //necessary due to #redirectmalfunction
      });
    cy.getCy("get_startedButton").should("be.visible");
    //cy.getCy("get_startedButton").click();
    //cy.url()
    //  .should("include", ":1:")
    //  .then($url => {
    //    cy.visit($url.replace("/__/", "/ords/")); //necessary due to #redirectmalfunction
    //  });
    //cy.get(".apex-logo-img").should("be.visible");
    //cy.percySnapshot("Get started after signup");
  });
});
