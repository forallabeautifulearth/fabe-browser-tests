context("App 200 page 1", () => {
  /**
   * Confirms that there are actions and click on the first one.
   * Confirms that the action is displayed after clicking.
   */

  before(function() {
    cy.login();
    cy.getCy("fa-home_link").should("be.visible");
  });
  //beforeEach(function() {
  //  cy.clearCookies();
  //  cy.setCookie("ORA_WWV_APP_200", appCookie);
  //  cy.visit(loggedInPage);
  //  cy.get(".env-display").should("contain", "{dev}");
  //  cy.getCy("fa-home_link").should("be.visible");
  //  cy.wait(500);
  //  cy.url()
  //    .should("contain", "p=200:1:")
  //    .then($url => {
  //      console.log($url);
  //      if ($url.includes("ACTION")) {
  //        console.log("not home page");
  //        cy.getCy("fa-home_link").click();
  //      } else {
  //        console.log("home page");
  //      }
  //    });
  //  cy.get(".apex-logo-img").should("be.visible");
  //});
  it("basic", () => {
    cy.clearCookies();
    cy.setCookie("ORA_WWV_APP_200", appCookie);
    cy.visit(loggedInPage);
  });
  it.skip("Execute action", () => {
    cy.get(".fabe-action-execute-birdhand:first").click({
      force: true
    });
    cy.get(".toast").should("be.visible");
    cy.get(".action-execute-count:first")
      .invoke("text")
      .then(text => {
        expect(parseInt(text.trim())).to.be.a("number");
      });
  });

  it.skip("Do / Undo execute action", () => {
    cy.get(".fabe-action-execute-birdhand:first").click({
      force: true
    });
    cy.get(".toast").should("be.visible");
    var acount;
    var bcount;
    cy.get(".action-execute-count:first")
      .invoke("text")
      .then(text => {
        acount = parseInt(text.trim());
        expect(acount).to.be.a("number");
      });
    cy.get(".toast-action").click({ force: true });
    cy.get(".action-execute-count:first")
      .invoke("text")
      .then(text => {
        bcount = parseInt(text.trim());
        expect(bcount).to.be.a("number");
        expect(bcount).to.be.at.least(acount);
      });
  });

  it.skip("Explore actions by 'action plans'", () => {
    cy.get(".action-plan-name:first").click();
    cy.url().should("contain", "P1_ACTION_PLAN_ID");
    cy.get(".fabe-action-execute-stats:first").click({ force: true });
    cy.url().should("contain", "P0_ACTION_ID");
  });

  it.skip("follow an action plan", () => {
    cy.get(".action-plan-name:first").click();
    cy.url().should("contain", "P1_ACTION_PLAN_ID");
    cy.getCy("action_plan_followingButton").should("be.visible");
    cy.containsCy("action_plan_followingButton", "Follow").should("be.visible");

    cy.get("#ActionPlanFollowing").click();
    cy.contains(
      "#ActionPlanRemindersModal-title",
      "Action plan reminders"
    ).should("be.visible");
    cy.get('[data-cy="remind_me!Button"]').click();
    cy.contains(
      "#ActionPlanRemindersModal-title",
      "Action plan reminders"
    ).should("not.be.visible");

    cy.containsCy("action_plan_followingButton", "Following").should(
      "be.visible"
    );
  });

  it.skip("open and review action info text", () => {
    cy.url().then($url => {
      console.log($url);
    });
    var cardNo = 2 + Math.floor(Math.random() * 7);
    expect(cardNo).to.be.within(2, 9);
    var actionName;
    cy.get(
      "#ActionPopularReport > .ma-region-body > :nth-child(1) > :nth-child(" +
        cardNo +
        ") > .fabe-action-card"
    )
      .find(".card-title")
      .invoke("text")
      .then($action => {
        actionName = $action;
        expect(actionName).to.be.a("string").and.not.be.empty;
      });
    cy.get(
      "#ActionPopularReport > .ma-region-body > :nth-child(1) > :nth-child(" +
        cardNo +
        ") > .fabe-action-card"
    ).click();
    cy.url().should("contain", "P0_ACTION_ID");
    cy.get(".action-details-name")
      .invoke("text")
      .then($action2 => {
        console.log("actionName :" + actionName);
        expect($action2)
          .to.be.a("string")
          .and.to.equal(actionName);
      });
  });
});
