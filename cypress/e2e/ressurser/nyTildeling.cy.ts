describe('See that assignment.resource.$id.user renders with users', () => {
    it('Navigate to "Ny Tildeling"', () => {
        cy.goToSpecificResource();
        cy.wait(1000);
        cy.get('a').contains('Ny tildeling').click();
        cy.wait(1000);
        cy.url().should('include', '/brukere');
    });

    it('Verify that data from resource loads, and that headings and toolbar loads', () => {
        cy.get('h2').should('have.text', 'Creative Cloud All Apps for K-12 - User License');

        cy.get('#user-tab').contains('Brukere').should('exist');
        cy.get('#role-tab').contains('Grupper').should('exist');

        cy.get('#user-type-select').should('be.visible');

        cy.get('#user-search').should('be.visible');

        cy.get('#users-table').should('be.visible').find('tr').should('have.length.greaterThan', 0);
    });

    it('In table, can see some "er tildelt" and some "Tildel"-buttons', () => {
        cy.get('table tr td').contains('Er tildelt').should('exist');
        cy.get('table tr').find('a').contains('Tildel').should('exist');
    });

    it('Assign resource to user', () => {
        cy.get('table tr td').contains('Er tildelt').should('exist');
        cy.get('table tr').contains('Lasse Luft').parent('tr').find('a').contains('Tildel').click();
        cy.wait(1000);
        cy.get('h1').last().should('have.text', 'Fullfør tildelingen');
        cy.get('button[type=submit]').contains('Lagre').should('exist').click();
        cy.get('.navds-alert--success').should('exist');
    });

    it('Remove resource from user', () => {
        cy.goToSpecificResource();
        cy.wait(1000);
        cy.get('table tr')
            .contains('Karen Berg')
            .should('exist')
            .parent('tr')
            .find('a')
            .contains('Slett')
            .click();
        cy.wait(1000);
        cy.get('button[type=submit]').contains('Slett').should('exist').click();
        cy.wait(1000);
        cy.get('.navds-alert--success').should('exist');
    });

    it('Can not remove resource from user', () => {
        cy.goToSpecificResource();
        cy.wait(1000);
        cy.get('table tr').contains('Bente Nordli').should('exist');
        cy.get('table tr td').contains('Begrenset').should('exist');
    });

    it('In table, can see some "Kan ikke slettes", "Gruppetildeling" and "Slett"-buttons', () => {
        cy.get('table tr td').contains('Begrenset').should('exist');
        cy.get('table tr td').contains('Gruppetildeling').should('exist');
        cy.get('table tr').find('a').contains('Slett').should('exist');
    });
});
