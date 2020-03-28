context("App 200 page 1", () => {
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
    cy.getCy("fa-home_link").click();
  });

  it.skip("Execute action", () => {
    cy.get(".fabe-action-execute-birdhand:first");
    //.click({
    //  force: true
    //});
    //cy.get(".toast").should("be.visible");
    //cy.get(".action-execute-count:first")
    //  .invoke("text")
    //  .then(text => {
    //    expect(parseInt(text.trim())).to.be.a("number");
    //  });
  });

  it("like a post", () => {
    cy.get(".e-FeedPost--like:first")
      .click()
      .should("have.class", "active");
  });

  it("comment on a post", () => {
    cy.get(".e-FeedPost--details:first").click({ force: true });
    cy.url().should("contain", "P0_FEED_POST_ID");
    cy.get("#AddFeedPostCommentMessage")
      .type(deleteName)
      .should("have.value", deleteName);
    cy.get(".mdc-icon-button__icon").click();
    cy.get(".mdc-snackbar__label").should("contain", "posted");
    cy.get("#FeedPostComments").should("contain", deleteName);
  });

  it("delete a comment on a post", () => {
    cy.get(".e-FeedPost--details:first").click({ force: true });
    cy.url().should("contain", "P0_FEED_POST_ID");
    cy.get("#AddFeedPostCommentMessage")
      .type(deleteName)
      .should("have.value", deleteName);
    cy.get(".mdc-icon-button__icon").click();
    cy.get(".mdc-snackbar__label").should("contain", "posted");
    cy.get("#FeedPostComments").should("contain", deleteName);
    cy.contains(deleteName).should("exist");
    cy.get(".mdc-list-item__meta > .mdc-icon-button > .fas:first").click();
    cy.get(".e-FeedPostComment--delete > .mdc-list-item__text").click();
    cy.get("#DeleteFeedPostCommentConfirm > .mdc-button__label").click();
    cy.get(".mdc-snackbar__label").should("contain", "deleted");
    cy.contains(deleteName).should("not.exist");
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
    //cy.get(".action-plan-name:first").click();
    //cy.url().should("contain", "P1_ACTION_PLAN_ID");
    //cy.get(".fabe-action-execute-stats:first").click({ force: true });
    //cy.url().should("contain", "P0_ACTION_ID");
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
