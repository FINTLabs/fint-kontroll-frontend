describe('Applikasjonskategori i innstillinger', () => {
    it('Navigate to "Innstillinger"', () => {
        cy.goToSettings();
        cy.wait(1000)
        cy.get("h1").should('have.text', "Innstillinger for kodeverk")

        cy.get("h2").should('have.length', 4)
    })

    it('should find card for applikasjonskategori and click', () => {
        cy.get("h2").contains("Applikasjonskategori").should('exist').click()
        cy.wait(1000)

        cy.get("h1").should('have.text', "Applikasjonskategori")

        cy.get("table").should('exist')
    })

        it('should be sorted correctly in table', () => {
            cy.get("table thead th").first().should('have.text', "Navn")
            cy.get("table tbody tr").should('have.length', 3)
            cy.get("table thead th").first().should('have.attr','aria-sort', 'none')

            cy.get("table thead th").first().click()
            cy.wait(1000)

            cy.get("table thead th").first().should('have.attr','aria-sort', 'ascending')
            const ascendingNames = ["Fagsystemer", "Kontorstøtte", "Pedagogisk programvare"]
            cy.get("table tbody tr").each(($el, index) => {
                cy.wrap($el).find("th").should('have.text', ascendingNames[index])
            })

            cy.get("table thead th").first().click()
            cy.wait(1000)

            cy.get("table thead th").first().should('have.attr','aria-sort', 'descending')
            const descendingNames = ["Pedagogisk programvare", "Kontorstøtte", "Fagsystemer"]
            cy.get("table tbody tr").each(($el, index) => {
                cy.wrap($el).find("th").should('have.text', descendingNames[index])
            })

            cy.get("table thead th").first().click()
            cy.wait(1000)
            cy.get("table thead th").first().should('have.attr','aria-sort', 'none')
        });

    it('should have edit and delete in menu', () => {
        cy.get("table tbody tr").first().should('have.attr', 'id', "1")
        cy.get("table tbody tr").first().find("td").last()
            .find("button").should('have.length', 3)
            .first().should('have.class', 'navds-dropdown__toggle').should('have.attr', 'aria-expanded', 'false')

        cy.get("table tbody tr").first().find("td").last().children().last().should('have.attr', 'aria-hidden', 'true')
        cy.get("table tbody tr").first().find("td").last().find("dl").children().should('have.length', 2).each(($el, index) => {
            const expectedText = index === 0 ? "Rediger" : "Slett";
            cy.wrap($el).should('have.text', expectedText);
        });
    });

    it('menu should open on click', () => {
        cy.get("table tbody tr").first().find("td").last().find("button").first().click()
        cy.get("table tbody tr").first().find("td").last().find("button").first().should('have.attr', 'aria-expanded', 'true')
    });

    it('should be able to edit usertype', () => {
        cy.get("table tbody tr").first().find("td").last().find("dl").children().contains("Rediger").click()
        cy.wait(1000)

        cy.get("dialog").should('exist')

        cy.get("dialog").contains("Rediger kategori").should('exist')
        cy.get("dialog").find("input").should('have.value', "Pedagogisk programvare")
        cy.get("dialog").find("textarea").should('have.value', "Kjempefin beskrivelse av pedagogisk programvare.")
        cy.get("dialog").find("button").contains("Lagre").should('exist')

    });

    it('should show dialog on delete', () => {
        cy.get("dialog").find("button").contains("Avbryt").click()
        cy.get("table tbody tr").first().find("td").last().find("button").first().click()
        cy.get("table tbody tr").first().find("td").last().find("dl").children().contains("Slett").click()

        cy.get("dialog").should('exist')
        cy.get("dialog h1").contains("Slett kategori: Pedagogisk programvare").should('exist')
        cy.get("dialog p").contains("Er du sikker på at du vil slette denne kategorien?").should('exist')

        cy.get("dialog").find("button").contains("Avbryt").should('exist')
        cy.get("dialog").find("button").contains("Slett").should('exist')
    });
})
