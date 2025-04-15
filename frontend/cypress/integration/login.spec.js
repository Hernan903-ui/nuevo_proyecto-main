describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login.html');
  });

  it('Focuses the email input on page load', () => {
    cy.focused().should('have.attr', 'name', 'email');
  });

  it('Accepts input for email', () => {
    const email = 'test@example.com';
    cy.get('[data-cy="email"]').type(email).should('have.value', email);
  });

  it('Accepts input for password', () => {
    const password = 'password123';
    cy.get('[data-cy="password"]').type(password).should('have.value', password);
  });

  it('Shows an error message if the email is invalid', () => {
    cy.get('[data-cy="email"]').type('invalid-email');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible');
  });

  it('Shows an error message if the password is too short', () => {
    cy.get('[data-cy="email"]').type('test@example.com');
    cy.get('[data-cy="password"]').type('123');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible');
  });

  it('Logs in successfully', () => {
    // Assuming you have a way to create a test user beforehand or a default test user
    cy.get('[data-cy="email"]').type('test@example.com');
    cy.get('[data-cy="password"]').type('password123');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/'); // Assuming successful login redirects to the root
  });

  it('Shows error for invalid credentials', () => {
    cy.get('[data-cy="email"]').type('invalid@example.com');
    cy.get('[data-cy="password"]').type('wrongpassword');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible');
  });
});