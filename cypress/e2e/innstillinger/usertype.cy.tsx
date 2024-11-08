describe('User Types i innstillinger', () => {
    it('Navigate to "Innstillinger"', () => {
        cy.goToSettings();
        cy.wait(1000)
        cy.get("h1").should('have.text', "Ressursinnstillinger")

        cy.get("h2").should('have.length', 4)
    })

    it('should find card for brukertyper and click', () => {
        cy.get("h2").contains("Brukertype").should('exist').click()
        cy.wait(1000)

        cy.get("h1").should('have.text', "Brukertyper")

        cy.get("table").should('exist')
    })

    it('should show all usertypes in a table', () => {
        cy.get("table thead th").first().should('have.text', "Brukertype")
        cy.get("table tbody tr").should('have.length', 4)

        const labels = ["EMPLOYEESTAFF", "EMPLOYEEFACULTY", "STUDENT", "EXTERNAL"]
        cy.get("table tbody tr").each(($el, index) => {
            cy.wrap($el).find("td").first().should('have.text', labels[index])
        })
    })

    it('should hbe able to edit usertype in dialog', () => {
        cy.get("table tbody tr").first().find("td").last().find("button").should('have.text', 'Rediger').click()
        cy.wait(1000)

        cy.get("dialog").should('exist')
        cy.get("dialog").contains("Rediger navn på brukertype: EMPLOYEESTAFF").should('exist')
        cy.get("dialog").find("input").should('have.value', "Ansatt")

        cy.get("dialog").find("button").should('have.length', 2)
        cy.get("dialog").find("button").contains("Lagre endringer").should('exist')
    })

    it("should give user feedback when input is unchanged or invalid", () => {
        const errorMessage = "En brukertype med samme navn eksisterer allerede."
        const saveButtonText = "Lagre endringer"
        cy.get("dialog").find("button").contains(saveButtonText).parent().should('have.attr', 'disabled')
        cy.get("dialog").find("input").type(" i utdanning")
        cy.get("dialog").find("input").should('have.attr', 'aria-invalid', 'true')
        cy.get("dialog").contains(errorMessage).should('exist')
        cy.get("dialog").find("button").contains(saveButtonText).parent().should('have.attr', 'disabled')

        cy.get("dialog").find("input").clear().type("Ansatt i skole")
        cy.get("dialog").contains(errorMessage).should('not.exist')
        cy.get("dialog").find("button").contains(saveButtonText).parent().should('not.have.attr', 'disabled')
    })

})
