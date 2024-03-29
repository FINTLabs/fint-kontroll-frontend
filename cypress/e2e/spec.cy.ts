Cypress.on("uncaught:exception", (err) => {
    // Cypress and React Hydrating the document don't get along
    // for some unknown reason. Hopefully, we figure out why eventually
    // so we can remove this.
    // https://github.com/remix-run/remix/issues/4822#issuecomment-1679195650
    // https://github.com/cypress-io/cypress/issues/27204
    if (
        /hydrat/i.test(err.message) ||
        /Minified React error #418/.test(err.message) ||
        /Minified React error #423/.test(err.message)
    ) {
        return false
    }
});

describe('My First Test', () => {
    it('Visits the app', () => {
        cy.visit('http://localhost:3000'
        );
    });
})

describe('User table Test', () => {

    it('Check user table (exists, has 10 rows)', () => {
        cy.visit('http://localhost:3000/users?size=10')
        cy.get('#userTable')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 10)
    });

    it('Pagination (select number of rows in table)', () => {
        cy.visit('http://localhost:3000/users?size=10')
        cy.get('#pagination').should('exist')
        cy.get('#selectNumberOfRows').should('be.visible')
        cy.get('#selectNumberOfRows').should('have.value', '10')
        cy.wait(3000)
        cy.get('#selectNumberOfRows').select('5')
        cy.wait(3000)
    });

    it('Pagination (check if number of pages in table is correct)', () => {
        cy.visit('http://localhost:3000/users?size=10')
        cy.get('#pagination').should('exist')
       // cy.get('#pagination ul>li').first().should('have.text', 'Forrige').should('be.disabled')
        cy.get('#pagination ul>li').last().should('have.text', 'Neste')
        cy.get('#pagination ul li').should('have.text', 'Forrige12345...10Neste')
        cy.wait(3000)
    });

    it('Select resource and go to page for resource details', () => {
        cy.visit('http://localhost:3000/users?size=10')
        cy.get('#userInfoButton-1129').should('exist')
        cy.wait(1000)
        cy.get('#userInfoButton-1129').click()
        cy.wait(1000)
    });
    /* describe('User info Test', () => {
         it('Connect to localhost for user info', (params) => {
             cy.visit('http://localhost:3000/users/1129')
         })
     });
     it('Check heading on user info page', () => {
         cy.visit('http://localhost:3000/users/1129')
         cy.get('h1').should('have.text', 'Brukerinformasjon')
         cy.wait(2000)
     });
     it('Check table heading on user info page', () => {
         cy.visit('http://localhost:3000/users/1129')
         cy.get('h2').should('have.text', 'Brukeren er tildelt følgende ressurser:')
         cy.wait(2000)
     });*/
})