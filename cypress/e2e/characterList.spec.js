describe("Character List Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays error state correctly", () => {
    cy.intercept("GET", "https://swapi.dev/api/people/?page=1", {
      statusCode: 500,
      response: {},
    }).as("getCharacters");

    cy.wait("@getCharacters");

    cy.contains("Error").should("be.visible");
  });

  it("displays the character list", () => {
    cy.contains(
      "[data-test-id='character-list-main-heading']",
      "Character List"
    ).should("be.visible");

    cy.get("[data-test-id='character-list-item']").should("have.length", 10);

    cy.contains("Luke Skywalker").should("be.visible");
    cy.contains("Darth Vader").should("be.visible");
  });

  it("displays the character info item", () => {
    cy.get("[data-test-id='character-info-item']").should("exist");

    cy.contains("[data-test-id='character-info-label']", "Gender").should(
      "exist"
    );
    cy.contains("[data-test-id='character-info-value']", "female").should(
      "exist"
    );
  });

  it("displays loading state correctly", () => {
    cy.contains("Loading...").should("be.visible");

    cy.wait(1000);

    cy.contains("Loading...").should("not.exist");
  });

  it("navigates to CharacterDetails page when clicking on a character", () => {
    cy.contains("Loading...").should("not.exist");

    cy.get("[data-test-id='character-list-item']").first().click();

    cy.url().should("include", "/character/1");

    cy.contains(
      "[data-test-id='character-details-name']",
      "Luke Skywalker"
    ).should("be.visible");
  });
});
