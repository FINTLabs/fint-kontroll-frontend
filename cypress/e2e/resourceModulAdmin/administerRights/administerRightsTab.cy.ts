import { wait } from '@testing-library/user-event/dist/utils';

describe("Test suite for 'Se brukere med roller'", () => {
    it('can render home page', () => {
        cy.goToHome();
        cy.wait(1000);
    });

    it('can see dropdown-button', () => {
        cy.get('#dropdown-button').should('be.visible');
    });

    it("Click into a 'menu' and select 'Ressursmoduladministrator", () => {
        cy.get('#dropdown-button').click();
        cy.get('#resource-module-admin').click();
        wait(1000);
    });

    it('Can see a table with at least one example user', () => {
        cy.get('#users-table').should('be.visible');
        cy.get('#users-table td').contains('Petter Pettersen').should('exist');
    });
});
