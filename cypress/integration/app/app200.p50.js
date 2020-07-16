context("app 200 p50", () => {
  before(function() {
    cy.login();
    //cy.getCy("fa-home_link").should("be.visible");
  });
  beforeEach(function() {
    cy.clearCookies();
    cy.setCookie("ORA_WWV_APP_200", appCookie);
    cy.visit(loggedInPage);
    cy.getCy("fa-calendar-day_link").click();
  });
  it.skip("personalize action plan", () => {
    cy.getCy("goButton").click();
    cy.get('[data-answer-id="10"] > .mdc-button__ripple').click();
    cy.getCy("nextButton").click();
    cy.get('[data-answer-id="60"] > .mdc-button__ripple');
    cy.getCy("nextButton").click();
  });
});
