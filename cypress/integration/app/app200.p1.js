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
    cy.get("#FeedPostCommentSend > .mdc-icon-button__icon").click();
    cy.get(".mdc-snackbar__label").should("contain", "posted");
    cy.get("#FeedPostComments").should("contain", deleteName);
  });

  it("delete a comment on a post", () => {
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
});
