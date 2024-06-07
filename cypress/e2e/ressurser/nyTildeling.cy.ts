describe('See that assignment.resource.$id.user renders with users', () => {


    it('Navigate to "Ny Tildeling"', () => {
        cy.goToSpecificResource();
        cy.wait(1000)
        cy.get("a").contains("Ny tildeling").click()
        cy.wait(1000)
    })

    it('Verify that data from resource loads, and that headings and toolbar loads', () => {
        cy.get("h2").should('have.text', "Creative Cloud All Apps for K-12 - User License")

        cy.get("a").contains("Brukere").should('exist')
        cy.get("a").contains("Grupper").should('exist')

        cy.get("#user-type-select").should('be.visible')

        cy.get("#user-search").should('be.visible')

        cy.get("#users-table").should('be.visible').find("tr").should('have.length.greaterThan', 0)
    })

    it('In table, can see some "er tildelt" and some "Tildel"-buttons', () => {
        cy.get("table tr td").contains("Er tildelt").should('exist')
        cy.get('table tr')
            .find('a')
            .contains('Tildel')
            .should('exist')

    })
})