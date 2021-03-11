context("App 200 page 1", () => {
  const deleteSeq = Cypress._.random(1e6, 2e6).toString();
  const deleteName = `Delete me (test ${deleteSeq})`;
  /**
   * Confirms that there are actions and click on the first one.
   * Confirms that the action is displayed after clicking.
   */

  before(function() {
    cy.login();
    cy.intercept("POST", "/ords/wwv_flow.ajax").as("db");
    cy.get("[data-cy=back_to_evryButton]")
      .click()
      .wait("@db");
  });
  beforeEach(function() {
    cy.clearCookies();
    cy.setCookie("ORA_WWV_APP_200", appCookie);
    cy.viewport(375, 812);
  });

  it.only("create post", () => {
    var explorePage = loggedInPage.replace(/:$/, "P0_STATE:ExploreTab");
    cy.visit(explorePage).wait("@db");
    //cy.get("#MainNavigation #mdc-tab-2").click().wait('@db');
    cy.wait(2000);
    cy.get(
      ".demo-card__primary-action > .flex-column > .flex-row > .demo-card__title:first"
    ).click();
    cy.get("#ActionDetailsExecute").click();
    cy.wait(1000);
    cy.get("#ActionExecuteModal-content > .mdc-text-field")
      .click()
      .type(deleteName);
    cy.get("#ActionExecuteMessage").should("have.value", deleteName);
    cy.get("#ActionExecutePublish").click();
    cy.get(".mdc-snackbar__label").should("contain", "Post added to fee");
    cy.get(".mdc-snackbar").then(snack => {
      console.log({ snack });
    });
    cy.get(".mdc-snackbar__action")
      .click()
      .wait("@db");
    cy.wait(1000);
    cy.url().should("contain", "200:1:");
    cy.wait(1000);
    cy.get(".e-FeedPost--like:first")
      .click()
      .wait("@db");
    cy.get(".e-FeedPost--like:first").should("have.class", "active");
  });

  it("check cap tab", () => {
    var explorePage = loggedInPage.replace(/:$/, "P0_STATE:ExploreTab");
    cy.visit(explorePage);
    cy.wait(2000);
    cy.get(
      ".demo-card__primary-action > .flex-column > .flex-row > .demo-card__title:first"
    ).click();
    cy.get("#ActionDetailsExecute").click();
    cy.wait(1000);
    cy.get("#ActionExecuteModal-content > .mdc-text-field")
      .click()
      .type(deleteName);
    cy.get("#ActionExecuteMessage").should("have.value", deleteName);
    cy.get("#ActionExecutePublish").click();
    cy.get(".mdc-snackbar__label").should("contain", "Thanks for sharing");
    cy.wait(1000);
    cy.get("#mdc-tab-3").click();
    cy.wait(1000);
    //cy.get('#CapTabChallenges').should("contain","You've completed");
    cy.get("[data-cy=finalize_dayButton]").should("contain", "Finalize day");
  });

  it("check healer board", () => {
    var explorePage = loggedInPage.replace(/:$/, "P0_STATE:ExploreTab");
    cy.visit(explorePage);
    cy.wait(2000);
    cy.get(
      ".demo-card__primary-action > .flex-column > .flex-row > .demo-card__title:first"
    ).click();
    cy.get("#ActionDetailsExecute").click();
    cy.wait(1000);
    cy.get("#ActionExecuteModal-content > .mdc-text-field")
      .click()
      .type(deleteName);
    cy.get("#ActionExecuteMessage").should("have.value", deleteName);
    cy.get("#ActionExecutePublish").click();
    cy.get(".mdc-snackbar__label").should("contain", "Thanks for sharing");
    cy.wait(1000);
    cy.get("#mdc-tab-4").click();
    cy.url().should("contain", ":20:");
    cy.wait(500);
    cy.get("#LeaderboardData").click();
    //cy.url().should("contain","cypresstestuser");
    //cy.get(".e-FeedPost--comment:first").click({ force: true });
    //cy.url().should("contain", "P0_FEED_POST_ID");
    //cy.get("#AddFeedPostCommentMessage")
    //  .type(deleteName)
    //  .should("have.value", deleteName);
    //cy.get("#FeedPostCommentSend").click();
    //cy.wait(1000);
    //cy.get(".mdc-snackbar__label").should("contain", "posted");
    //cy.get("#FeedPostComments").should("contain", deleteName);
  });

  it("check account tab", () => {
    var explorePage = loggedInPage.replace(
      /:$/,
      "P0_JOURNEY_USERNAME:cypresstestuser"
    );
    cy.visit(explorePage);
    cy.wait(2000);
    cy.get("#JourneyProfile").should("contain", "cypress");
  });

  it.skip("like a post", () => {
    cy.visit(loggedInPage);
    cy.wait(2000);
    cy.get("#mdc-tab-1").click();
    cy.wait(2000);
    cy.get(".e-FeedPost--like:first").click();
    cy.get(".e-FeedPost--like:first").should("have.class", "active");
  });

  it.skip("comment on a post", () => {
    cy.get(".e-FeedPost--details:first").click({ force: true });
    cy.url().should("contain", "P0_FEED_POST_ID");
    cy.get("#AddFeedPostCommentMessage")
      .type(deleteName)
      .should("have.value", deleteName);
    cy.get("#FeedPostCommentSend").click();
    cy.wait(1000);
    cy.get(".mdc-snackbar__label").should("contain", "posted");
    cy.get("#FeedPostComments").should("contain", deleteName);
  });

  it.skip("delete a comment on a post", () => {
    cy.get(".e-FeedPost--details:first").click({ force: true });
    cy.url().should("contain", "P0_FEED_POST_ID");
    cy.get("#AddFeedPostCommentMessage")
      .type(deleteName)
      .should("have.value", deleteName);
    cy.get("#FeedPostCommentSend > .mdc-icon-button__icon").click();
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
