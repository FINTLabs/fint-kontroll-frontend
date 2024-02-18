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



/*
    describe('Check the user page with no backend', () => {
   // const searchText = 'TEST';

    beforeEach(() => {
        const baseUrl = "http://localhost:3000";
       cy.interceptAndReturnFile("GET", `${baseUrl}/users/?size=5`, "users.json");
       // cy.interceptAndReturnFile("GET", `${baseUrl}/users`, "users.json");
    });

    it('Connect to localhost', () => {
        cy.goToHome();
    })

    /!*it('Check type in searchField, and clear input', () => {
        cy.goToHome();
        cy.get('#outlined-search').should('exist')
        cy.get('#outlined-search').should('have.value', '')
        cy.get('#showClearIcon').should('not.be.visible')
        cy.get('#outlined-search').type(searchText).should('have.value', searchText)
        cy.wait(1000)
        cy.get('#showClearIcon').should('be.visible')
        cy.get('#outlined-search').should('be.visible')
        cy.wait(1000)
        cy.get('#showClearIcon').click();
        cy.wait(1000)
        cy.get('#outlined-search').should('have.value', '')
    })

    it('Check table (exists, has 5 rows)', () => {
        cy.goToHome();
        cy.get('#userTable')
            .should('be.visible')
        // .find('tbody tr')
        // .should('have.length', 5);
    });*!/

*/
//})