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

    it('Should display correct labels for user types', () => {
        cy.get('h1').should('have.text', 'Creative Cloud All Apps for K-12 - User License')
        cy.get('div').find('#resourceInfoBox').should('exist')
            .find('ul li').should('have.length', 6)
            .should('contain.text', 'Gyldig for:Elev, Ansatt, Ukjent')
    })

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
        cy.get('#userType-chip').should('not.exist')

        cy.get('#user-type-select').select('STUDENT');
        cy.get('#userType-chip').contains('Elev')

        cy.get('#user-type-select').select('EMPLOYEESTAFF');
        cy.get('#userType-chip').contains('Ansatt')

        cy.get('#userType-chip').contains('Ansatt').click()
    })

    it('Check user table (exists, has 10 rows)', () => {
        cy.get('#assigned-users-table')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 10);
    })

    it('Pagination (select number of rows in table)', () => {
        cy.get('#pagination').should('be.visible')
        cy.get('#select-number-of-rows').should('exist').select('5')
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
