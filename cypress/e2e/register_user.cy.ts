
describe('register page', () => {
    it("it should visit register page, register user and get success message for successful registration",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-register-btn').click();

        cy.url().should('include', '/auth/register');
        
        cy.get('[data-cy="reg-firstname"]').type('cypress');
        cy.get('[data-cy="reg-lastname"]').type('test');
        cy.get('[data-cy="reg-username"]').type('cypress');
        cy.get('[data-cy="reg-email"]').type('cypress@gmail.com');
        cy.get('[data-cy="reg-password"]').type('plokijuhy');
        cy.get('[data-cy="reg-confirm-password"]').type('plokijuhy');

        
        cy.get('[data-cy="reg-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Your account has been created successfully');

        cy.url().should('eq', 'http://localhost:4200/auth/login');
    })

    it("it should show error message if an already registered email tries to register again",()=>{
        cy.visit('http://localhost:4200')

        cy.get('.nav-register-btn').click();

        cy.url().should('include', '/auth/register');

        // cy.get('[data-cy="forgot-password"]').click();
        
        cy.get('[data-cy="reg-firstname"]').type('cypress');
        cy.get('[data-cy="reg-lastname"]').type('test');
        cy.get('[data-cy="reg-username"]').type('cypress');
        cy.get('[data-cy="reg-email"]').type('cypress@gmail.com');
        cy.get('[data-cy="reg-password"]').type('plokijuhy');
        cy.get('[data-cy="reg-confirm-password"]').type('plokijuhy');

        
        cy.get('[data-cy="reg-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('The email provided is already registered!');

    })


    it("it should return error message if first name is less than 3 characters",()=>{
        cy.visit('http://localhost:4200/auth/register')
        
        cy.get('[data-cy="reg-firstname"]').type('c');

        
        cy.get('[data-cy="reg-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Firstname must be more than 3 characters');

    })

    it("it should return error message if last name is less than 3 characters",()=>{
        cy.visit('http://localhost:4200/auth/register')
        
        cy.get('[data-cy="reg-firstname"]').type('cypress');
        cy.get('[data-cy="reg-lastname"]').type('te');

        cy.get('[data-cy="reg-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Last name must be more than 3 characters!');

    })

    it("it should visit register page, register user and get success message for successful registration",()=>{
        cy.visit('http://localhost:4200/auth/register')
        
        cy.get('[data-cy="reg-firstname"]').type('cypress');
        cy.get('[data-cy="reg-lastname"]').type('test');
        cy.get('[data-cy="reg-username"]').type('cy');

        
        cy.get('[data-cy="reg-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Username must be more than 3 characters!');

    })

    it("it should visit register page, register user and get success message for successful registration",()=>{
        cy.visit('http://localhost:4200/auth/register')
        
        cy.get('[data-cy="reg-firstname"]').type('cypres.s');
        cy.get('[data-cy="reg-lastname"]').type('te<>st');
        cy.get('[data-cy="reg-username"]').type('cypress');
        cy.get('[data-cy="reg-email"]').type('cypress@gmail.com');
        cy.get('[data-cy="reg-password"]').type('plokijuhy');
        cy.get('[data-cy="reg-confirm-password"]').type('plokijuhy');

        cy.get('[data-cy="reg-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('One or both names contain invalid characters');

    })


    it("it should visit register page, register user and get success message for successful registration",()=>{
        cy.visit('http://localhost:4200/auth/register')
        
        cy.get('[data-cy="reg-firstname"]').type('cypress');
        cy.get('[data-cy="reg-lastname"]').type('test');
        cy.get('[data-cy="reg-username"]').type('cypress');
        cy.get('[data-cy="reg-email"]').type('cyp@@ress@gmail.com');
        cy.get('[data-cy="reg-password"]').type('plokijuhy');
        cy.get('[data-cy="reg-confirm-password"]').type('plokijuhy');

        cy.get('[data-cy="reg-btn"]').click();

        cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Invalid email format');

    })

    
    it("it should take user to feed if they skip to feed",()=>{
        cy.visit('http://localhost:4200/auth/register')

        
        cy.get('[data-cy="skip-to-feed"]').click();

        cy.url().should('eq', 'http://localhost:4200/');
    })
    
    it("it should take user to login page if click login link",()=>{
        cy.visit('http://localhost:4200/auth/register')

        
        cy.get('#go-to-login').click();

        cy.url().should('eq', 'http://localhost:4200/auth/login');
    })

    
  
  })
  