context("App 200 page 10 - onboarding", () => {
  const deleteSeq = Cypress._.random(1e6, 2e6).toString();
  const deleteName = `Delete me (test ${deleteSeq})`;
  /**
   * Confirms that there are actions and click on the first one.
   * Confirms that the action is displayed after clicking.
   */

  before(function() {
    cy.login();
    cy.server();
    cy.route("POST", "/ords/wwv_flow.ajax").as("refresh");
  });
  beforeEach(function() {
    cy.clearCookies();
    cy.setCookie("ORA_WWV_APP_200", appCookie);
    cy.visit(loggedInPage);
    cy.getCy("fa-clipboard-list-check_link").click();
    //cy.get('[data-cy=fa-clipboard-list-check_link]')
  });

  it("complete action plan", () => {
    cy.getCy("goButton").click();
    cy.get("#P10_QUESTION_DISPLAY").should("contain", "climate change");
    //cy.wait(2000);
    cy.get('[data-answer-id="1"]')
      .should("exist")
      .then(text => {
        console.log(text[0].innerText);
        expect(text[0].innerText).to.eq("GO PLASTIC FREE");
      })
      .click();
    cy.get('[data-answer-id="2"]')
      .should("exist")
      .then(text => {
        console.log(text[0].innerText);
        expect(text[0].innerText).to.eq("REDUCE ENERGY USE");
      })
      .click();
    cy.get('[data-answer-id="4"]')
      .should("exist")
      .then(text => {
        console.log(text[0].innerText);
        expect(text[0].innerText).to.eq("FOOD AND DIET");
      })
      .click();
    cy.get('[data-answer-id="5"]')
      .should("exist")
      .then(text => {
        console.log(text[0].innerText);
        expect(text[0].innerText).to.eq("REUSE, REPURPOSE, REPAIR");
      })
      .click();
    cy.get(".mdc-snackbar__label").should("contain", "3 answers allowed");
    cy.getCy("nextButton")
      .first()
      .click();
    //cy.wait(@refresh)
  });
});
