describe('Check the resource details page', () => {

    const searchTextUser = 'Bente';

    it('Select resource and go to page for resource details, click "Brukere"', () => {
        cy.goToRessurser();
        cy.wait(1000)
        cy.get('table tr').contains('User License').get('button').contains('Se info').click()
        cy.wait(1000)
        cy.get('#brukere-link').click()
        cy.wait(1000)
    });

    it('Check searchfield for user, type and remove the search name filter', () => {
        cy.get('#user-search').should('exist')
        cy.get('#user-search').should('have.value', '')
        cy.get('#user-search').type(searchTextUser).should('have.value', searchTextUser)
        cy.get('#user-search').type('{enter}')
        cy.wait(1000)
        cy.get('#assigned-users-table').should('be.visible')
            .find('tbody tr')
            .should('have.length', 1)

        cy.get('#user-search').clear()
        cy.get('#user-search').type('{enter}')
        cy.wait(1000)

        cy.get('#user-search').should('have.value', '')
    });

    it('Check select usertype (options, clickable), and remove filter', () => {
        cy.get('#user-type-select').should('exist')
        cy.get('#user-type-chip').should('not.exist')

        cy.get('#user-type-select').select('STUDENT');
        cy.get('#user-type-chip').contains('STUDENT')

        cy.get('#user-type-select').select('EMPLOYEESTAFF');
        cy.get('#user-type-chip').contains('EMPLOYEESTAFF')

        cy.get('#user-type-chip').contains('EMPLOYEESTAFF').click()
    })

    it('Check user table (exists, has 10 rows)', () => {
        cy.get('#assigned-users-table')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 10);
    })

    it('Pagination (select number of rows in table)', () => {
        cy.get('#pagination').should('be.visible')
        cy.get('#pagination-select').should('exist').select('5')
        cy.wait(1000)
    });

    it('Pagination (go to "Neste")', () => {
        cy.get("button").contains("Neste").click()
        cy.wait(1000)

        cy.location('search').then((search) => {
            const params = new URLSearchParams(search);

            const paramValue = params.get('page');

            expect(paramValue).to.equal('1');
        })
    });

    it('Pagination (iconButton go to "Last page" and then "previous page")', () => {
        cy.get("button").contains("Forrige").click()
        cy.wait(1000)

        cy.location('search').then((search) => {
            const params = new URLSearchParams(search);

            const paramValue = params.get('page');

            expect(paramValue).to.equal('0');
        })
        cy.wait(1000)
    });
})
