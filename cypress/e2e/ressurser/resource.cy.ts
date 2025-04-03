describe('Check the resource details page', () => {
    const searchTextUser = 'Bente';

    it('Select resource and go to page for resource details, click "Brukere"', () => {
        cy.setCookie('size', '10');
        cy.goToRessurser();
        cy.wait(1000);
        cy.get('table tr').contains('User License').get('button').contains('Se info').click();
        cy.wait(1000);
        cy.get('Button').contains('Brukere').should('exist').click();
        cy.wait(1000);
    });

    it('Should show info box and display correct labels for user types', () => {
        cy.get('h1').should('have.text', 'Creative Cloud All Apps for K-12 - User License');
        cy.get('div')
            .find('#info-box')
            .should('exist')
            .find('ul li')
            .should('contain.text', 'Gyldig forElev, Ansatt, Ukjent');
    });

    it('Check searchfield for user, type and remove the search name filter', () => {
        cy.get('#user-search').should('exist');
        cy.get('#user-search').should('have.value', '');
        cy.get('#user-search').type(searchTextUser).should('have.value', searchTextUser);
        cy.get('#user-search').type('{enter}');
        cy.wait(1000);
        cy.get('#assigned-users-table')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 2); // 2 because it is expandable, but only 1 is visible

        cy.get('#user-search').clear();
        cy.get('#user-search').type('{enter}');
        cy.wait(1000);

        cy.get('#user-search').should('have.value', '');
    });

    it('Check select usertype (options, clickable), and remove filter', () => {
        cy.get('#user-type-select').should('exist');
        cy.get('#userType-chip').should('not.exist');

        cy.get('#user-type-select').select('STUDENT');
        cy.get('#userType-chip').contains('Elev');

        cy.get('#user-type-select').select('EMPLOYEESTAFF');
        cy.get('#userType-chip').contains('Ansatt');

        cy.get('#userType-chip').contains('Ansatt').click();
    });

    it('Check user table (exists, has 10 rows)', () => {
        cy.get('#assigned-users-table')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 20); // 20 because it is expandable, but only 10 is visible
    });

    it('Pagination for resources should exists and visible, select number of rows to be "5"', () => {
        cy.get('#select-number-of-rows').should('be.visible');
        cy.get('#pagination').should('be.visible');
        cy.get('#select-number-of-rows').select('5');
        cy.wait(1000);
        cy.get('#assigned-users-table')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 10); // 10 because it is expandable, but only 5 is visible
    });
});
