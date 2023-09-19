import 'cypress-file-upload'


describe('update user profile', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/login')

        cy.get('[data-cy="login-email"]').type('cypress@gmail.com');
        cy.get('[data-cy="login-password"]').type('plokijuhy');

        cy.get('[data-cy="submit-login-form"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Login successful!');
      });

    it("it should visit update user profile page and ensure the update user details form is available",()=>{
        cy.visit('http://localhost:4200/edit-profile')

        cy.get('#first_name').should('exist');
        cy.get('#last_name').should('exist');
        cy.get('#username').should('exist');
        cy.get('#website_url').should('exist');
        cy.get('#linkedin_url').should('exist');
        cy.get('#facebook_url').should('exist');
        cy.get('#instagram_url').should('exist');
        cy.get('#twitter_url').should('exist');
        cy.get('#bio').should('exist');
        cy.get('#submit-profile-update').should('exist');

    })

    it("it should visit update user profile page and try updating user details and get success message for successful update",()=>{
      cy.visit('http://localhost:4200/edit-profile')

      cy.get('#website_url').clear();
      cy.get('#linkedin_url').clear();
      cy.get('#facebook_url').clear();
      cy.get('#instagram_url').clear();
      cy.get('#twitter_url').clear();
      cy.get('#bio').clear();

      cy.get('#website_url').type('https://www.cypress.io/');
      cy.get('#linkedin_url').type('https://www.linkedin.com/company/cypress.io');
      cy.get('#facebook_url').type('https://www.facebook.com/cypressio/');
      cy.get('#instagram_url').type('https://www.instagram.com/cypressio/');
      cy.get('#twitter_url').type('https://twitter.com/Cypress_io');
      cy.get('#bio').type('This is the official test profile for the Link Up Social Site');
      cy.get('#submit-profile-update').click();

      cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Profile updated successfully');

    })

    it("it should update user profile picture",()=>{
      cy.visit('http://localhost:4200/edit-profile')
      
      cy.get('#change-profile-pic').attachFile('../../src/assets/img/cypress_logo.png')
      
      cy.get('#submit-profile-update').click();

      cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Profile updated successfully');

    })
  
    
  })
  