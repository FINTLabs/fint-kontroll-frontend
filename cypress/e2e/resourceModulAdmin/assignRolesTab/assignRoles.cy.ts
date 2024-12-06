import { wait } from "@testing-library/user-event/dist/utils"

describe("Check resources-admin", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	it("can see dropdown-button", () => {
		cy.get("#dropdown-button").should("be.visible")
	})

	it("Click into a 'menu' and select 'Ressursmoduladministrator", () => {
		cy.get("#dropdown-button").click()
		cy.get("#resource-module-admin").click()
		wait(1000)
	})

	it("can see navigation-tab", () => {
		cy.get("#create-assignment").should("be.visible")
	})

	it("can navigate to 'Opprett tildeling'", () => {
		cy.contains("Opprett ny tildeling").click()
		wait(1000)
	})

	it("List of users should be visible", () => {
		cy.get("#user-search-list").should("be.visible")
	})

	it("Dropdown of 'Velg Rolle' should be visible", () => {
		cy.contains("Velg rolle").should("be.visible")
	})

	it("Dropdown of 'Legg til organisasjonsenheter' should be visible", () => {
		cy.contains("Legg til organisasjonsenheter").should("be.visible")
	})
})
