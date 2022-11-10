context("home page add and search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("user can access individual recipe card by clicking recipe name", () => {
    cy.get(".input-field").type("gin");
    cy.findByRole("button", { name: /add/i }).click();
    cy.get(".search-button").click();
    cy.findByRole("heading", { name: /3\-mile long island iced tea/i }).click();
    cy.url().should("eq", "http://localhost:3000/recipe/15300");
    cy.findByRole("heading", { name: /3\-mile long island iced tea/i }).should(
      "be.visible"
    );
    cy.findByRole("img", { name: /cocktail thumbnail/i }).should("be.visible");
  });

  it("user can access individual recipe card by clicking recipe image", () => {
    cy.get(".input-field").type("gin");
    cy.findByRole("button", { name: /add/i }).click();
    cy.get(".search-button").click();
    cy.get("#15300").click();
    cy.url().should("eq", "http://localhost:3000/recipe/15300");
    cy.findByRole("heading", { name: /3\-mile long island iced tea/i }).should(
      "be.visible"
    );
  });
});
