// include base Cypress types
/// <reference types="cypress" />

// this is how you can add your custom commands to "cy" object
// see https://on.cypress.io/typescript

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Creates a user session and sets cookies for the given app200 page.
     * @example
     * cy.userLoginSetup(9999)
     */
    userLoginSetup(pageNumber: number): void;

    /**
     * Creates a session for admin user for a given page.
     * @example
     * cy.adminLoginSetup(20)
     * @example
     * cy.adminLoginSetup(120, Cypress.env("adminReaderUsername"))
     */
    adminLoginSetup(pageNumber: number, username?: string): void;

    /**
     * Create a valid & authenticated url with parameters
     * @example
     * setUpAuth("/f?p=201:",20,123456789)
     */
    setUpAuth(url: string, pageNum: number, valid_session: number): void;

    /**
     * Verifies that the item does not already exist before creating it
     * @example
     * cy.verifyNotThere("An item")
     */
    verifyNotThere(givenItem: string): void;

    /**
     * Opens modal to create a given item name
     * @example
     * cy.openCreateModal()
     */
    openCreateModal(): void;

    /**
     * Loads an image to a form in a modal in the admin app
     * @example
     * cy.uploadImg($body, 11)
     */
    uploadImg(body: string, pageNum: number): void;

    /**
     * Submits the form in the admin modal
     * @example
     * cy.submitModal($body)
     */
    submitModal(body: string): void;

    /**
     * Closes the modal in the admin app
     * @example
     * cy.closeModal($body)
     */
    closeModal(body: string): void;

    /**
     * Confirms an item is present
     * @example cy.confirmItem("Delete me (test)")
     */
    confirmItem(name: string): void;

    /**
     * Finds element with the given data-cy attribute.
     * @example
     * cy.getCy('user') // same as cy.get('[data-cy=user]')
     */
    getCy(attribute: string): Chainable<JQuery<Element>>;
  }
}
