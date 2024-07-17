describe("Character Details Page", () => {
  let characterData;

  before(() => {
    cy.fixture("characterDetailsData").then((data) => {
      characterData = data;
    });
  });

  beforeEach(() => {
    cy.visit("/character/1");
  });

  it("displays character details", () => {
    const characterDetails = characterData.characterDetails;

    cy.contains(characterDetails.name).should("be.visible");
    cy.contains(characterDetails.genderLabel).should("be.visible");
    cy.contains(characterDetails.genderValue).should("be.visible");
    cy.contains(characterDetails.homePlanetLabel).should("be.visible");
    cy.contains(characterDetails.homePlanetValue).should("be.visible");
  });

  it("should display film list", () => {
    const filmList = characterData.filmList;

    cy.get("[data-test-id='film-list']").should("exist");
    cy.get("[data-test-id='films-list-item']").should(
      "have.length",
      filmList.filmCount
    );
    filmList.filmTitles.forEach((title) => {
      cy.contains("[data-test-id='films-list-item']", title).should("exist");
    });
  });

  it("Should display character info item", () => {
    const characterInfo = characterData.characterInfo;

    cy.get("[data-test-id='character-info-item']").should("exist");
    cy.contains(
      "[data-test-id='character-info-label']",
      characterInfo.infoLabel
    ).should("exist");
    cy.contains(
      "[data-test-id='character-info-value']",
      characterInfo.infoValue
    ).should("exist");
  });

  it("should navigate to the CharacterList page when clicking on back button", () => {
    const backButtonNavigation = characterData.backButtonNavigation;

    cy.get("[data-test-id='character-details-back-button']")
      .should("exist")
      .click();
    cy.wait(2000);
    cy.url().should("include", backButtonNavigation.characterListUrl);
    cy.get("[data-test-id='character-list-main-heading']", {
      timeout: 10000,
    }).should("exist");
  });
});
