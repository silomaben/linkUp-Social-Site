import 'cypress-file-upload'



describe('update user profile', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/login')

        cy.get('[data-cy="login-email"]').type('cypress@gmail.com');
        cy.get('[data-cy="login-password"]').type('plokijuhy');

        cy.get('[data-cy="submit-login-form"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Login successful!');
      });

    it("it should give error message if user enters wrong password to confirm deactivation ",()=>{
        cy.visit('http://localhost:4200/edit-profile')

        cy.get('.user-settings').click();

        cy.get('[data-cy="deactivate-account-form"]').should('exist');
        
        cy.get('#confirmPassword').type('wrong-password');
        
        cy.get('[data-cy="deactivate-settings-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Invalid password. Please enter correct password');

    })
    
    it("it should deactivate user account",()=>{
        cy.visit('http://localhost:4200/edit-profile')

        cy.get('.user-settings').click();

        cy.get('[data-cy="deactivate-account-form"]').should('exist');
        
        cy.get('#confirmPassword').type('plokijuhy');
        
        cy.get('[data-cy="deactivate-settings-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Account deactivated successfully,Loging you out');

        cy.url().should('eq', 'http://localhost:4200/auth/login');

    })
  })

describe('reactivate user account', () => {
    it("it should reactivate user account by logging in again",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-login-btn').click();

        cy.url().should('include', '/auth/login');

        cy.get('[data-cy="login-email"]').type('cypress@gmail.com');
        cy.get('[data-cy="login-password"]').type('plokijuhy');

        cy.get('[data-cy="submit-login-form"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Login successful!');

        cy.url().should('eq', 'http://localhost:4200/');
    })
})