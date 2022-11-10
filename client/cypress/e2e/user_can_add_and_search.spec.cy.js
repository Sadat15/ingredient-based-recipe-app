// // imports
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import SearchBar from '../../src/components/SearchBar';
// import App from '../../src/App';

// ReactDOM.render(document.getElementById('root').render(SearchBar));

//Older version of react?
// ReactDOM.render(<App />, document.getElementById('root'));

// test
context("home page add and search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  // 1000, '#root', 'node_modules/resq/dist/app.js'

  it("should go the homepage and user can add and search recipes by ingredients", () => {
    cy.get(".input-field").type("gin");
    cy.findByRole("button", { name: /add/i }).click();
    // cy.get('.add-button').click();
    cy.get(".search-button").click();
    cy.url().should("eq", "http://localhost:3000/recipes");

    // cy.getReact('SearchBar', {
    //   state: { search: [] },
    // })
    //   .getCurrentState()
    //   .should('eq', ['gin']); // can return string | boolean | any[] | {}
  });

  it("user can search without adding", () => {
    cy.get(".input-field").type("gin");
    cy.get(".search-button").click();
    cy.url().should("eq", "http://localhost:3000/recipes");
  });

  it("user can add multiple ingredients", () => {
    cy.get(".input-field").type("gin");
    cy.findByRole("button", { name: /add/i }).click();
    cy.get(".input-field").type("vodka");
    cy.findByRole("button", { name: /add/i }).click();
    cy.get(".input-field").type("rum");
    cy.findByRole("button", { name: /add/i }).click();
    cy.get(".search-button").click();
    cy.url().should("eq", "http://localhost:3000/recipes");
    cy.findByRole("heading", { name: /3\-mile long island iced tea/i }).should(
      "be.visible"
    );
  });

  it("user can add by clicking suggested ingredients", () => {
    cy.get(".input-field").type("gi");
    cy.findByRole("button", { name: /^gin$/i }).click();
    cy.get(".search-button").click();
    cy.url().should("eq", "http://localhost:3000/recipes");
  });
});
