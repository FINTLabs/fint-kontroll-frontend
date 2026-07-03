describe('User Types i innstillinger', () => {
    it('Navigate to "Innstillinger"', () => {
        cy.goToSettings();
        cy.wait(1000);
    });

    it('should find card for brukertyper and click', () => {
        cy.get('h2').contains('Brukertype').should('exist').click();
        cy.wait(1000);

        cy.get('h1').should('have.text', 'Brukertyper');

        cy.get('table').should('exist');
    });

    it('should show all usertypes in a table', () => {
        cy.get('table thead th').first().should('have.text', 'Brukertype');
        cy.get('table tbody tr').should('have.length', 4);

        const labels = ['EMPLOYEESTAFF', 'EMPLOYEEFACULTY', 'STUDENT', 'EXTERNAL'];
        cy.get('table tbody tr').each(($el, index) => {
            cy.wrap($el).find('td').first().should('have.text', labels[index]);
        });
    });

    it('should enable inline editing for user types', () => {
        cy.get('table tbody tr').first().find('td').first().should('exist');

        cy.contains('button', 'Rediger').should('be.visible').click();

        // Etter click skal inputs vises i tabellen
        cy.get('table tbody input[type="text"]').should('exist');

        // Sjekk at minst én rad er i edit mode
        cy.get('table tbody tr').first().find('input[type="text"]').should('be.visible');
    });

    it('should give user feedback when input is unchanged or invalid', () => {
        const errorMessage = 'En brukertype med samme navn eksisterer allerede.';

        cy.contains('button', 'Rediger').click();

        const input = cy.get('[data-testid="mapping-input-1"]');

        input.clear().type('Elev');

        input.should('have.attr', 'aria-invalid', 'true');
        cy.contains(errorMessage).should('exist');

        cy.contains('button', 'Lagre alle endringer').should('be.disabled');

        input.clear().type('Ansatt i skole');

        input.should('not.have.attr', 'aria-invalid');

        cy.contains(errorMessage).should('not.exist');
        cy.contains('button', 'Lagre alle endringer').should('not.be.disabled');
    });

    it('should save all edited user types', () => {
        cy.contains('button', 'Rediger').click();

        cy.get('table tbody input[type="text"]').first().clear().type('Ansatt test');

        cy.contains('button', 'Lagre alle endringer').click();

        //  cy.contains('Brukertyper').should('exist');
    });
});
