context('home page add and search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should go the homepage and user can add and search recipes by ingredients', () => {
    cy.get('.input-field').type('gin');
    cy.get('.add-button').click();
    cy.get('.search-button').click();
    cy.url().should('eq', 'http://localhost:3000/recipes');
  });
});
