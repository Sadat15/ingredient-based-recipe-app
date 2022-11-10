context("individual card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(".input-field").type("gin");
    cy.findByRole("button", { name: /add/i }).click();
    cy.get(".search-button").click();
    cy.findByRole("heading", { name: /3\-mile long island iced tea/i }).click();
    cy.url().should("eq", "http://localhost:3000/recipe/15300");
  });

  it("user can select ingredient dropdown", () => {
    // cy.get(".list > li");
    cy.get(".ingredient-dropdown > .btn", { name: /gin/i });
  });
});
