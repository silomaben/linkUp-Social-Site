
describe('view posts', () => {
    it('Should view posts in feed even without logging in', () => {
      cy.visit('http://localhost:4200/')
  
      cy.scrollTo('bottom');
  
      cy.window().then((win) => {
        const scrollPosition = win.scrollY;
        expect(scrollPosition).to.be.greaterThan(120);
      })
  
      cy.get('.picture-post').should('exist');
  
    });

    // it('should create a post without image and give a success message after posting', () => {
    //   cy.visit('http://localhost:4200/auth/login')
      
    //   cy.get('[data-cy="login-email"]').type('cypress@gmail.com');
    //   cy.get('[data-cy="login-password"]').type('plokijuhy');
      
    //   cy.get('[data-cy="submit-login-form"]').click();
      
    //   cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Login successful!');
      
    //   cy.url().should('eq', 'http://localhost:4200/');
      
    //   cy.get('[data-cy="add-a-post"]').click();
      
    //   cy.get('[data-cy="add-post-textarea"]').type('this is a cypress test');
      
    //   cy.get('[data-cy="add-post-submit"]').click();
      
    //   cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Post uploaded successfully');

    //   cy.url().should('eq', 'http://localhost:4200/');
    // });

    it('should create a post with image and give a success message after posting', () => {
      // cy.visit('http://localhost:4200/auth/login')
      
      // cy.get('[data-cy="login-email"]').type('cypress@gmail.com');
      // cy.get('[data-cy="login-password"]').type('plokijuhy');
      
      // cy.get('[data-cy="submit-login-form"]').click();
      
      // cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Login successful!');
      
      // cy.url().should('eq', 'http://localhost:4200/');
      
      // cy.get('data-cy="add-a-post"').click();
      
      // cy.get('[data-cy="add-post-textarea"]').type('this is a cypress test');
      
      // cy.get('data-cy="add-post-submit"').click();
      
      // cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Post uploaded successfully');

      // cy.url().should('eq', 'http://localhost:4200/');
    });
    
    it('should tag users and find that they have been tagged in the post', () => {
      // cy.visit('http://localhost:4200/auth/login')
      
      // cy.get('[data-cy="login-email"]').type('cypress@gmail.com');
      // cy.get('[data-cy="login-password"]').type('plokijuhy');
      
      // cy.get('[data-cy="submit-login-form"]').click();
      
      // cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Login successful!');
      
      // cy.url().should('eq', 'http://localhost:4200/');
      
      // cy.get('data-cy="add-a-post"').click();
      
      // cy.get('[data-cy="add-post-textarea"]').type('this is a cypress test');
      
      // cy.get('data-cy="add-post-submit"').click();
      
      // cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Post uploaded successfully');

      // cy.url().should('eq', 'http://localhost:4200/');
    });


    it('should like an image and increment the like count', () => {
      cy.visit('http://localhost:4200/auth/login')
      
      cy.get('[data-cy="login-email"]').type('cypress@gmail.com');
      cy.get('[data-cy="login-password"]').type('plokijuhy');
      
      cy.get('[data-cy="submit-login-form"]').click();
      
      cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Login successful!');
      
      cy.url().should('eq', 'http://localhost:4200/');

      cy.get('[data-cy="like-btn-feed"]').first().click();



      // .within(() => {
      //   cy.get('[data-cy="like-count"]').should('exist');
      //   cy.get('[data-cy="like-count"]').then(($likeCount) => {
      //     const initialLikeCount = parseInt($likeCount.text());
  
      //     cy.contains('.picture-post', 'This is the text you want to find')
      //       .within(() => {
      //       cy.contains('like-btn-feed', 'Like').click(); 
      //     });
  
      //     cy.get('.comment-like-count').then(($updatedLikeCount) => {
      //       const updatedLikeCount = parseInt($updatedLikeCount.text());

      //       expect(updatedLikeCount).to.eq(initialLikeCount + 1);
      //     });
      //   });
      // });

    });

    it('should tag users and find that they have been tagged in the post', () => {
      // cy.visit('http://localhost:4200/auth/login')
      
      // cy.get('[data-cy="login-email"]').type('cypress@gmail.com');
      // cy.get('[data-cy="login-password"]').type('plokijuhy');
      
      // cy.get('[data-cy="submit-login-form"]').click();
      
      // cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Login successful!');
      
      // cy.url().should('eq', 'http://localhost:4200/');
      
      // cy.get('data-cy="add-a-post"').click();
      
      // cy.get('[data-cy="add-post-textarea"]').type('this is a cypress test');
      
      // cy.get('data-cy="add-post-submit"').click();
      
      // cy.get('.toast-container', { timeout: 10000 }).should('be.visible').contains('Post uploaded successfully');

      // cy.url().should('eq', 'http://localhost:4200/');
    });
    
  });


  

      
      // // Select an element and add a data-cy attribute
      // cy.get('.post')
      //   .first() // Select the first post element (modify as needed)
      //   .invoke('attr', 'data-cy', 'post-element'); // Set data-cy attribute
      
      // // Now you can use data-cy for test selection
      // cy.get('[data-cy=post-element]').should('exist');