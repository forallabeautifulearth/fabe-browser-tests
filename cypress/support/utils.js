// I like creating simple utility functions rather than "cy..." commands
// it is simple, can be easily documented via JSDoc comments
// and does not require typings in index.d.ts file

export const getIframeBody = () =>
  cy
    .get("iframe")
    .invoke("contents")
    .invoke("find", "body");

export const getIframeDom = () => getIframeBody().then(cy.wrap);

export const closeIframeModal = () => {
  cy.log("closeModal");

  getIframeDom()
    .find(".t-Alert-content")
    .should("contain", "Processed");
  /* the below used to be 'save' but this was causing flakiness issues ~
    5% of the time, specifically 'no data found'.
    Now we cancel and then refresh */
  getIframeBody()
    .findCy("cancelButton")
    .click();

  // iframe has been destroyed
  cy.get("iframe").should("not.exist");
};
