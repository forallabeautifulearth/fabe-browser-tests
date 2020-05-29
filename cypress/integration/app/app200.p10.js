context("App 200 page 10 - onboarding", () => {
  const deleteSeq = Cypress._.random(1e6, 2e6).toString();
  const deleteName = `Delete me (test ${deleteSeq})`;
  /**
   * Confirms that there are actions and click on the first one.
   * Confirms that the action is displayed after clicking.
   */

  before(function() {
    cy.login();
    //cy.getCy("fa-home_link").should("be.visible");
  });
  beforeEach(function() {
    cy.clearCookies();
    cy.setCookie("ORA_WWV_APP_200", appCookie);
    cy.visit(loggedInPage);
    cy.getCy("fa-clipboard-list-check_link").click();
  });

  it("complete action plan", () => {
    cy.get(".fabe-region-body > .mdc-button").click();
    cy.get("#P10_QUESTION_DISPLAY").should("contain", "climate change");
    cy.wait(2000);
    cy.get('[data-answer-id="1"] > .mdc-button__ripple')
      .should("exist")
      .then(text => {
        console.log(text);
      });
  });
});
