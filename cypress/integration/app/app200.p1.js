context("App 200 page 1", () => {
  /**
   * Confirms that there are actions and click on the first one.
   * Confirms that the action is displayed after clicking.
   */
  //const clickFirstActionCard = () => {
  //  cy.get("#BrowseActionsReport .fabe-action-card")
  //    .should("exist")
  //    // this wait is necessary because the framework first displays
  //    // the cards THEN attaches event listeners, re-rendering the DOM elements.
  //    // without this wait the tests are flaky - sometimes the event
  //    // listeners are attached and the click works, sometimes it clicks too early
  //    .wait(1000);
  //
  //  cy.get("#BrowseActionsReport .fabe-action-card")
  //    .first()
  //    .find("a.card-title")
  //    .should("be.visible")
  //    .click();
  //
  //  // TODO grab the action category id attribute and check that url goes to the right one
  //  cy.url().should("include", "P2_ACTION_ID:");
  //  cy.get("#P2_ACTION_NAME_DISPLAY").should("be.visible");
  //  cy.get("#BrowseActionsReport").should("not.exist");
  //  cy.get("#StatsContainer").should("be.visible");
  //};

  before(function () {
    cy.login()
    cy.get(".fabe-tab-home.brand-logo").should("be.visible");
  });
  beforeEach(function () {
    cy.visit(loggedInPage)
  })

  it("Execute action", () => {
    cy.get(".fabe-action-execute-birdhand")
      .first()
      .click({
        force: true
      });
    cy.get(".toast").should("be.visible");
    cy.get(".frequency-action-execute-user-count:first")
      .invoke("text")
      .then(text => {
        expect(parseInt(text.trim())).to.be.a("number");
      });
  });

  it("Do / Undo execute action", () => {
    cy.get(".fabe-action-execute-birdhand")
      .first()
      .click({
        force: true
      });
    cy.get(".toast").should("be.visible");
    var acount;
    var bcount;
    cy.get(".frequency-action-execute-user-count:first")
      .invoke("text")
      .then(text => {
        acount = parseInt(text.trim());
        expect(acount).to.be.a("number");
      });
    cy.get(".toast-action").click({ force: true });
    cy.get(".frequency-action-execute-user-count:first")
      .invoke("text")
      .then(text => {
        bcount = parseInt(text.trim());
        expect(bcount).to.be.a("number");
        expect(bcount).to.be.at.least(acount);
      });
  });

  it("Explore actions by 'action plans'", () => {
    cy.get(".action-plan-name")
      .first()
      .click();
    cy.url().should("contain", "P1_ACTION_PLAN_ID");
    cy.get(".fabe-action-execute-stats")
      .first()
      .click({ force: true });
    cy.url().should("contain", "P0_ACTION_ID");
  });
});
