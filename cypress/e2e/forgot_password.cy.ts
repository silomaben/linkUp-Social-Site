
describe('forgot password', () => {
    it("it should visit forgot password page and get back a toast message for successfully sending a reset password request",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-login-btn').click();

        cy.url().should('include', '/auth/login');

        cy.get('[data-cy="forgot-password"]').click();
        
        cy.get('[data-cy="forgot-password-email-input"]').type('admin@gmail.com');
        
        cy.get('[data-cy="forgot-password-btn"]').click();


        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Password reset link has been sent to');
  
    })
  
    it("it should show toastify with error if email is not registered",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-login-btn').click();

        cy.url().should('include', '/auth/login');

        cy.get('[data-cy="forgot-password"]').click();
        
        cy.get('[data-cy="forgot-password-email-input"]').type('doesntexist@gmail.com');
        
        cy.get('[data-cy="forgot-password-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Email is not registered');
  
    })

    it("it should show toastify with error if no email is entered",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-login-btn').click();

        cy.url().should('include', '/auth/login');

        cy.get('[data-cy="forgot-password"]').click();
        
        cy.get('[data-cy="forgot-password-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Please Input an email');
  
    })

    it("it should show toastify with error if wrong email is used",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-login-btn').click();

        cy.url().should('include', '/auth/login');

        cy.get('[data-cy="forgot-password"]').click();

        cy.get('[data-cy="forgot-password-email-input"]').type('doesntexist@gma@@il.com');
        
        cy.get('[data-cy="forgot-password-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Incorrect email format. Please enter valid email format');
  
    })
  })
  