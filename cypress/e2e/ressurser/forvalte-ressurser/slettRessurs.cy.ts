describe('Test delete resource', () => {
    it('Navigate to resource-admin and click delete on resource in table', () => {
        cy.goToResourceAdmin();
        cy.wait(1000)
        cy.get("table tr")
            .contains("Creative Cloud All Apps for K-12 - User License")
            .should("exist")
            .parent("tr")
            .find("a")
            .contains("Slett")
            .click();
        cy.wait(3000);
    });

    it('Delete resource in modal and handles response', () => {
        cy.intercept('DELETE', 'http://localhost:8063/beta/fintlabs-no/api/resources/v1/:id', {
            statusCode: 204,
        });
        cy.wait(1000);
        cy.get('input[name="id"]').invoke('val', '5').should("exist");
        cy.get("button[type=submit]").contains("Slett").should("exist").click();
        cy.goToResourceAdminWithResponse();
        cy.get(".navds-box .navds-alert").should("exist");
        cy.wait(1000);
        cy.get(".navds-box .navds-alert").contains("Ressursen ble slettet!");
    });
})