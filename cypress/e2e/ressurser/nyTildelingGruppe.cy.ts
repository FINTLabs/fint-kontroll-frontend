describe('See that assignment.resource.$id.group renders with groups', () => {
    it('Navigate to "Ny Tildeling"', () => {
        cy.goToSpecificResource();
        cy.wait(1000);
        cy.get('a').contains('Ny tildeling').click();
        cy.wait(1000);
    });

    it('Go to groups and assign resource', () => {
        cy.get('Button').contains('Grupper').should('exist').click();
        cy.wait(1000);
        cy.get('h3').should('have.text', 'Grupper');

        cy.get('table tr td').find('a').contains('Tildel').should('exist').click();
        cy.wait(1000);
        cy.get('dialog h1').should('have.text', 'Fullfør tildelingen');
        cy.get('dialog').find('button[type=submit]').contains('Lagre').should('exist').click();
        cy.wait(1000);
        cy.get('.navds-alert--success').should('exist');
    });

    it('Remove resource from group', () => {
        cy.goToSpecificResource();
        cy.wait(1000);
        cy.get('Button').contains('Grupper').should('exist').click();
        cy.wait(1000);
        cy.get('table tr').should('exist').find('a').contains('Slett').click();
        cy.wait(1000);
        cy.get('button[type=submit]').contains('Slett').should('exist').click();
        cy.wait(1000);
        cy.get('.navds-alert--success').should('exist');
    });

    it('Navigate to "Ny Tildeling" when "Roller"-tabs is selected', () => {
        cy.goToSpecificResource();
        cy.wait(1000);
        cy.get('Button').contains('Grupper').should('exist').click();
        cy.wait(1000);
        cy.get('a').contains('Ny tildeling').click();
        cy.wait(1000);
        cy.url().should('include', '/grupper');
        cy.get('Button')
            .contains('Grupper')
            .parent()
            .parent()
            .should('have.attr', 'aria-selected', 'true');
    });
});
