/// <reference types="cypress" />

export {}
declare global{
  namespace Cypress {
  interface Chainable<Subject = any> {
    login(email:string, password:string): Chainable<void>;
  }
}
}