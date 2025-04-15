describe('Navigation', () => {
    it('Navigates to the products page', () => {
      cy.visit('/');
      cy.get('[data-cy="products-link"]').click();
      cy.url().should('include', '/products.html');
      cy.contains('Products List'); // Verifica que la página tiene un título
    });
  });