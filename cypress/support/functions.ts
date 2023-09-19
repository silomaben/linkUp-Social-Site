// /// <reference types= "cypress"/>

// declare global{
//     namespace Cypress{
//         interface Chainable {
//             login(): Chainable <string>
//         }
//     }
// }

// Cypress.Commands.add("login", (username: any, password: any) => {
//     cy.visit('http://localhost:5500/client/auth/html/login.html');
//     cy.get('#email').type(username);
//     cy.get('#password').type(password);
//     cy.get('#submit').click();
// });


// export default{}