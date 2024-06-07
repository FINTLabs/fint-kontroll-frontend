import {wait} from "@testing-library/user-event/dist/utils";

describe('Check roles page with mock data', () => {

    it('Navigate to Grupper', () => {
        cy.goToGrupper();
        wait(1000)
    })

    it('Pagination (select number of rows in table)', () => {
        cy.get('#pagination').should('be.visible')
    });

    it('Check table exists and has 10 rows, then change to 5 rows', () => {
        cy.get('#role-table').should('be.visible')
            .find('tbody tr')
            .should('have.length', 10);
        cy.get("#select-number-of-rows").select("5")
        wait(1500)
        cy.get('#role-table').should('be.visible')
            .find('tbody tr')
            .should('have.length', 5);
    });

    it('Searching creates a filter, which can be removed.', () => {
        const searchText = 'oko';
        cy.get('#search-role').type(searchText).should('have.value', searchText);
        cy.get('#search-role').type('{enter}');
        cy.wait(1000)

        cy.get('#role-table')
            .find('tr td')
                .should('contain', 'OKO');
        cy.get("#search-name-chip").should('be.visible')
    });

    it('Remove filter and verify chips is gone', () => {
        cy.get('#search-role').clear().should('have.value', "");
        cy.get('#search-role').type('{enter}');
        cy.wait(1000)
        cy.get("#search-name-chip").should('not.exist')
    })

    it('Includes sub-org-units, and update table with result', () => {
        cy.get('#org-unit-filter').should('be.visible').click()

        cy.get('#sub-org-unit-switch').check()

        cy.get('.org-unit-checkbox').first().click()

        cy.get("button").contains("Sett filter").click()
        wait(1000)

        cy.get('#role-table')
            .find('tr td')
                .contains("DIGIT");
    })
});
