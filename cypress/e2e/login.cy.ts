
describe('login page', () => {
    it("it should visit login page, fill login form and get success message for successful login",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-login-btn').click();

        cy.url().should('include', '/auth/login');

        cy.get('[data-cy="login-email"]').type('admin@gmail.com');
        cy.get('[data-cy="login-password"]').type('plokijuhy');

        
        cy.get('[data-cy="submit-login-form"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Login successful!');

        cy.url().should('eq', 'http://localhost:4200/');
    })

    it("it should notify user to enter email if they do not key in an email",()=>{
        cy.visit('http://localhost:4200/auth/login')

        // cy.get('[data-cy="login-email"]').type('admin@gmail.com');
        cy.get('[data-cy="login-password"]').type('plokijuhy');

        
        cy.get('[data-cy="submit-login-form"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Please type an email!');

    })
    it("it should notify user to enter password if they do not key in a password",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-login-btn').click();

        cy.url().should('include', '/auth/login');

        cy.get('[data-cy="login-email"]').type('admin@gmail.com');
        // cy.get('[data-cy="login-password"]').type('plokijuhy');

        
        cy.get('[data-cy="submit-login-form"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Please enter your password!');
    })
    it("it should alert user if they enter unregistered email",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-login-btn').click();

        cy.url().should('include', '/auth/login');

        cy.get('[data-cy="login-email"]').type('doesntexist@gmail.com');
        cy.get('[data-cy="login-password"]').type('plokijuhy');

        
        cy.get('[data-cy="submit-login-form"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Email is not registered');
    })
    it("it should alert user if email entered is of incorrect format",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-login-btn').click();

        cy.url().should('include', '/auth/login');

        cy.get('[data-cy="login-email"]').type('@dmin@gm@@ail.com');
        cy.get('[data-cy="login-password"]').type('plokijuhy');

        
        cy.get('[data-cy="submit-login-form"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Please enter valid email address!');

    })
    it("it should take user to feed if they skip to feed",()=>{
        cy.visit('http://localhost:4200/auth/login')

        
        cy.get('[data-cy="skip-to-feed"]').click();

        cy.url().should('eq', 'http://localhost:4200/');
    })

    it("it should visit forgot password page if user clicks forgot password",()=>{
        cy.visit('http://localhost:4200/auth/login')

        cy.get('[data-cy="forgot-password"]').click();

        cy.url().should('eq', 'http://localhost:4200/auth/forgot-password');
    })
  
  })
  