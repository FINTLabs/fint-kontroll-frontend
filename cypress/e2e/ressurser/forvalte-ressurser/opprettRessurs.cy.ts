describe('Test creation of new resource', () => {
    it('Navigate to opprett-ny-applikasjonsressurs', () => {
        cy.goToCreateResource();
        cy.wait(1000)
    });

    it('Submits form and handles response', () => {
        cy.intercept('POST', 'http://localhost:8063/beta/fintlabs-no/api/resources/v1', {
            statusCode: 201,
        }).as('formSubmit');


        cy.get('input[name="resourceId"]').invoke('val', 'cypressTestRessurs');
        cy.get('input[name="resourceName"]').invoke('val', 'Cypress Test Ressurs');
        cy.get('input[name="resourceType"]').invoke('val', 'ApplicationResource');
        cy.get('input[name="platform"]').eq(0).invoke('val', 'win');
        cy.get('input[name="accessType"]').invoke('val', 'Device based license');
        cy.get('input[name="resourceLimit"]').invoke('val', '30');
        cy.get('input[name="resourceOwnerOrgUnitId"]').invoke('val', '153');
        cy.get('input[name="resourceOwnerOrgUnitName"]').invoke('val', 'KOMP Område sørvest');

        // cy.get('input[name="validForOrgUnits[0].resourceId"]').invoke('val','cypressTestRessurs');
        // cy.get('input[name="validForOrgUnits[0].orgUnitName"]').invoke('val','INFRA Samferdsel');
        // cy.get('input[name="validForOrgUnits[0].orgUnitId"]').invoke('val','8');
        // cy.get('input[name="validForOrgUnits[0].resourceLimit"]').invoke('val','10');
        //
        // cy.get('input[name="validForOrgUnits[1].resourceId"]').invoke('val','cypressTestRessurs');
        // cy.get('input[name="validForOrgUnits[1].orgUnitName"]').invoke('val','KOMP Område sørvest');
        // cy.get('input[name="validForOrgUnits[1].orgUnitId"]').invoke('val','153');
        // cy.get('input[name="validForOrgUnits[1].resourceLimit"]').invoke('val','20');

        // cy.get('input[name="validForRoles[]"]').eq(0).invoke('val','Elev');
        // cy.get('input[name="validForRoles[]"]').eq(1).invoke('val','Ansatt skole');
        cy.wait(1000);

        cy.get('input[name="hasCost"]').invoke('val', 'true');
        cy.get('input[name="licenseEnforcement"]').invoke('val', 'Hard stop');
        cy.get('input[name="unitCost"]').invoke('val', '199');
        cy.get('input[name="status"]').invoke('val', 'ACTIVE');

        cy.get("button[type=submit]").contains("Lagre ressurs").should("exist").click();
        cy.wait(1000);
        cy.get(".navds-box .navds-alert").should("exist");
        cy.wait(1000);
        cy.get(".navds-box .navds-alert").contains("Ressursen ble opprettet!");

    });
})