describe('Test creation of new resource', () => {
    it('Navigate to opprett-ny-applikasjonsressurs', () => {
        cy.goToCreateResource();
        cy.wait(1000);
    });

    it('fyller ut skjema og sender inn', () => {
        cy.contains('button', 'Lagre ressurs').should('be.disabled');

        cy.contains('label', 'Navn på ressurs')
            .parent()
            .find('input')
            .should('be.visible')
            .should('not.be.disabled')
            .type('Cypress Test Ressurs');

        cy.contains('label', 'Ansatt', { timeout: 10000 })
            .parents('.navds-checkbox')
            .find('input[type="checkbox"]')
            .check({ force: true });

        cy.contains('label', 'Kontorstøtte', { timeout: 10000 })
            .parents('.navds-checkbox')
            .find('input[type="checkbox"]')
            .check({ force: true });

        cy.contains('label', 'Maks antall', { timeout: 10000 })
            .parents('.navds-radio')
            .find('input[type="radio"]')
            .check({ force: true });

        cy.contains('label', 'org1', { timeout: 10000 })
            .parents('.navds-radio')
            .find('input[type="radio"]')
            .check({ force: true });

        cy.contains('label', 'Aktiv', { timeout: 10000 })
            .parents('.navds-radio')
            .find('input[type="radio"]')
            .check({ force: true });

        cy.contains('button', 'Lagre ressurs').should('not.be.disabled').click();

        cy.get('#alert-box').should('exist');
        cy.wait(1000);
        cy.get('#alert-box').contains('Ressursen ble opprettet!');
    });
});
