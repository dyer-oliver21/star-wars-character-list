describe("Character List Page", () => {
  let testData;

  before(() => {
    cy.fixture("characterListData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("displays error state correctly", () => {
    cy.intercept("GET", "https://swapi.dev/api/people/?page=1", {
      statusCode: 500,
      response: {},
    }).as("getCharacters");

    cy.wait("@getCharacters");

    cy.contains(testData.error).should("be.visible");
  });

  it("displays the character list", () => {
    cy.contains(
      "[data-test-id='character-list-main-heading']",
      testData.characterListHeading
    ).should("be.visible");

    cy.get("[data-test-id='character-list-item']").should("have.length", 10);

    testData.characters.forEach((character) => {
      cy.contains(character).should("be.visible");
    });
  });

  it("displays the character info item", () => {
    const characterInfo = testData.characterInfo;

    cy.get("[data-test-id='character-info-item']").should("exist");

    cy.contains(
      "[data-test-id='character-info-label']",
      characterInfo.label
    ).should("exist");
    cy.contains(
      "[data-test-id='character-info-value']",
      characterInfo.value
    ).should("exist");
  });

  it("displays loading state correctly", () => {
    cy.get("[data-test-id='character-list-loading']").should("exist");

    cy.wait(testData.loadingTimeout);

    cy.get("[data-test-id='character-list-loading']").should("not.exist");
  });

  it("navigates to CharacterDetails page when clicking on a character", () => {
    cy.get("[data-test-id='character-list-loading']").should("not.exist");

    cy.get("[data-test-id='character-list-item']")
      .first()
      .should("be.visible")
      .click();

    cy.url().should("include", "/character/1");

    cy.wait(testData.loadingTimeout);

    cy.contains(
      "[data-test-id='character-details-name']",
      testData.characters[0]
    ).should("be.visible");
  });
});

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
