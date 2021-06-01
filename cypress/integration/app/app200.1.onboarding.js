context("App 200 onboarding", () => {
  const deleteSeq = Cypress._.random(1e6, 2e6).toString();
  const deleteName = `Delete me (test ${deleteSeq})`;
  const waitTime = 1000;
  /**
   * Confirms that there are actions and click on the first one.
   * Confirms that the action is displayed after clicking.
   */

  before(function() {
    cy.login();
  });
  beforeEach(function() {
    cy.clearCookies();
    cy.setCookie("ORA_WWV_APP_200", appCookie);
    cy.viewport(375, 812);
  });

  it("complete questionnaire", () => {
    cy.intercept("POST", "/ords/wwv_flow.ajax").as("next");
    cy.url()
      .should("contain", "200:10:")
      .wait(waitTime);

    cy.get("[data-cy=tell_us_about_yourselfButton]")
      .click()
      .wait(waitTime);

    cy.get("#P10_QUESTION").should(
      "contain",
      "What type of area do you live in?"
    );
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait(waitTime);
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should(
      "contain",
      "What kind of home do you live in?"
    );
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should("contain", "What is on your property?");
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should(
      "contain",
      "How would you describe your diet?"
    );
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should("contain", "Where do you get your food?");
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should("contain", "What do you do for a living?");
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should("contain", "And when you are not working?");
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should("contain", "How do you get around?");
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should("contain", "Do you take care of children?");
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should("contain", "Do you have pets?");
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should(
      "contain",
      "What are your top climate action priorities?"
    );
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=nextButton]")
      .click()
      .wait("@next");

    cy.get("#P10_QUESTION").should("contain", "How active do you want to be?");
    cy.get(".fabe-answer-pill:first")
      .click()
      .wait("@next");
    cy.get("[data-cy=completeButton]")
      .click()
      .wait("@next");

    cy.get("#OnboardingLoading").should("contain", "Building a Planet Plan");

    cy.get("#OnboardingRecommendationSummary").should(
      "contain",
      "We Recommend"
    );

    /*cy.get("[data-cy=start_the_healingButton]")
      .click()
      .wait("@next");
    cy.url().should("contain", "200:50:");

    cy.get(".introjs-tooltiptext").should(
      "contain",
      "How will you heal the planet today?"
    );
    cy.get(".introjs-nextbutton")
      .click()
      .wait("@next");
    cy.get(".introjs-skipbutton").click();*/
  });
});
