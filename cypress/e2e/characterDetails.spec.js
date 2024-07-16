describe("Character Details Page", () => {
  beforeEach(() => {
    cy.visit("/character/1");
  });

  it("displays character details", () => {
    cy.contains("Luke Skywalker").should("be.visible");
    cy.contains("Gender").should("be.visible");
    cy.contains("male").should("be.visible");
    cy.contains("Home Planet").should("be.visible");
    cy.contains("Tatooine").should("be.visible");
  });

  it("should display film list", () => {
    cy.get("[data-test-id='film-list']").should("exist");

    cy.get("[data-test-id='films-list-item']").should("have.length", 4);
    cy.contains("[data-test-id='films-list-item']", "A New Hope").should(
      "exist"
    );
  });

  it("Should display character info item", () => {
    cy.get("[data-test-id='character-info-item']").should("exist");
    cy.contains("[data-test-id='character-info-label']", "Hair Colour").should(
      "exist"
    );
    cy.contains("[data-test-id='character-info-value']", "blond").should(
      "exist"
    );
  });

  it("should navigate to the CharacterList page when clicking on back button", () => {
    cy.get("[data-test-id='character-details-back-button']")
      .should("exist")
      .click();

    cy.wait(2000);

    cy.url().should("include", "/");

    cy.get("[data-test-id='character-list-main-heading']", {
      timeout: 10000,
    }).should("exist");
  });
});
