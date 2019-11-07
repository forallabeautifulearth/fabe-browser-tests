var itemText, nameIndex;

//before(function() {
//  cy.request("/website/test/seed_data/");
//});
//after(function() {
//  cy.request("/website/test/seed_data/");
//});

//adminLoginSetup is used to bypass the login in the admin app
Cypress.Commands.add("adminLoginSetup", (pageNum, username, password) => {
  cy.server();
  cy.route("POST", "/ords/wwv_flow.ajax").as("refresh"); //used in confirmItemCreated
  expect(pageNum, "page number").to.be.a("number");

  if (!username) {
    username = Cypress.env("adminUsername");
  }

  if (!password) {
    password = Cypress.env("adminPassword");
  }
  expect(username, "admin username").to.be.a("string").and.be.not.empty;

  cy.request(`/website/bypass/login/${username}/${password}`)
    .its("body")
    .then(({ app_session, cookie_value }) => {
      // confirm that we got valid response from the server
      expect(app_session, "app session").to.be.a("number");
      expect(cookie_value, "cookie value").to.be.a("string");

      cy.setCookie("ORA_WWV_APP_201", cookie_value);
      const url = "/f?p=201:";
      cy.setUpAuth(url, pageNum, app_session);
    });
});

//userLoginSetup is used to bypass the login in the app
Cypress.Commands.add("userLoginSetup", (pageNum, password) => {
  expect(pageNum, "page number").to.be.a("number");
  if (!password) {
    password = Cypress.env("userPassword");
  }

  const userEmail = Cypress.env("userEmail");
  expect(userEmail, "user email").to.be.a("string").and.be.not.empty;

  cy.request(`/website/bypass/login/${userEmail}/${password}`)
    .its("body")
    .then(({ app_session, cookie_value }) => {
      // confirm that we got valid response from the server
      expect(app_session, "app session").to.be.a("number");
      expect(cookie_value, "cookie value").to.be.a("string");

      cy.setCookie("ORA_WWV_APP_200", cookie_value);
      cy.setCookie("LOGIN_USERNAME_COOKIE", userEmail);

      const url = "/f?p=200:";
      cy.setUpAuth(url, pageNum, app_session);
    });
});

//setUpAuth is used for both admin and app tests to bypass the login
Cypress.Commands.add("setUpAuth", (url, pageNum, valid_session) => {
  expect(url, "url").to.be.a("string");
  expect(pageNum, "page number").to.be.a("number");
  expect(valid_session, "session").to.be.a("number");

  let authUrl = url + pageNum + ":" + valid_session; //+ ":::" + pageNum;
  cy.visit(authUrl);

  // wait for the loading splash screen to go away
  cy.get(".pg-loading").should("not.be.visible");
});

//verifyNotThere is used in the admin to make sure a givenItem
//is not present in the table before attempting to create it
Cypress.Commands.add("verifyNotThere", givenItem => {
  cy.getCy("NameTableHeader").then($content => {
    //console.log($content);
    nameIndex = $content[0].cellIndex;
    //console.log("nameIndex :" + nameIndex);
    cy.get("table tr:eq(2) > td:eq(" + nameIndex + ")").then($content => {
      itemText = $content[0].innerText;
      //console.log("itemText :" + itemText);
      expect(itemText).to.not.eq(givenItem);
    });
  });
});

//openCreateModal is used to open Modals in the admin app
Cypress.Commands.add("openCreateModal", () => {
  cy.log("openCreateModal");
  cy.getCy("createButton").click();
  cy.get("iframe").then($iframe => {
    //wait for iframe to load.
    //console.log($iframe);
    return new Cypress.Promise(resolve => {
      $iframe.on("load", () => {
        resolve($iframe.contents().find("body"));
        console.log("loaded 93");
      });
    });
  });
});

//uploadImg is used in the admin app to load an image in a modal
Cypress.Commands.add("uploadImg", ($body, pageNum) => {
  const cyDom = cy.wrap($body);
  var fileName = "test.png";
  var selector = "#P" + pageNum + "_IMG_BLOB";
  cyDom.find(selector).then(subject => {
    return cy
      .fixture(fileName, "base64")
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const el = subject[0];
        const testFile = new File([blob], fileName, {
          type: "image/png"
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        return subject;
      });
  });
});

//submitModal is used to submit forms in modals in the admin app
Cypress.Commands.add("submitModal", body => {
  cy.log("submitModal");
  cy.wrap(body)
    .findCy("createButton")
    .click();

  cy.get("iframe").then($iframe2 => {
    //wait for 2nd iframe to load.
    return new Cypress.Promise(resolve => {
      $iframe2.on("load", () => {
        resolve($iframe2.contents().find("body"));
        console.log("loaded 137");
      });
    });
  });
});

//closeModal is used to exit out of the Modal in the admin app
//there is a history of this step causing instability and some compromises were forged
Cypress.Commands.add("closeModal", $iframe => {
  cy.log("closeModal");

  const $body = $iframe.contents().find("body");
  const cyDom = cy.wrap($body);
  cyDom.find(".t-Alert-content").should("contain", "Processed");
  /*the below used to be 'save' but this was causing flakiness issues ~
    5% of the time, specifically 'no data found'.
    Now we cancel and then refresh */
  const cyDom2 = cy.wrap($body);
  //cyDom2.find('[data-cy="saveButton"]').click(); //causing instability
  cyDom2.find('[data-cy="cancelButton"]').click();
});

//confirmItem is used to confirm that a partical item was created in the admin app
Cypress.Commands.add("confirmItem", (itemName, page_name) => {
  //refresh the report
  //cy.get("#" + page_name + "_search_button").click();
  //cy.get(".a-Toolbar-group--together > .js-actionButton").click();
  //cy.get("#actions_ig_toolbar_search_field").type("Delete {enter}");
  //cy.get('#impact-areas_search_field')
  //cy.wait(["@refresh"]);
  /// success message is shown
  //cy.contains(".t-Alert--success", "Saved")
  //  .should("be.visible")
  //  .find(".icon-close")
  //  .click({ force: true });
  //cy.contains(".t-Alert--success", "Saved").should("not.be.visible");
  cy.contains("td", itemName).should("be.visible");
});

//
// A couple of small utilities to encourage good selectors.
//

/**
 * If your DOM element has "data-cy=x" attribute, you can find it with
 *
 * @example
 *  cy.getCy('x')
 */
Cypress.Commands.add("getCy", s => {
  const selector = `[data-cy=${s}]`;
  return cy.get(selector);
});

/**
 * Find element that is a child of another element using "data-cy=x" attribute.
 *
 * @example
 *  cy.contains('Some text').findCy('x')
 */
Cypress.Commands.add("findCy", { prevSubject: true }, (subject, s) => {
  const selector = `[data-cy=${s}]`;
  //debugger;
  return cy.wrap(subject).find(selector);
});

//per: https://docs.cypress.io/api/events/catalog-of-events.html#Examples
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.config({
  defaultCommandTimeout: 10000
});
