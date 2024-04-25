import { wait } from "@testing-library/user-event/dist/utils"


describe("Check 'Knytt features til roller'", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	it("can see dropdown-button", () => {
		cy.get("#dropdown-button").should("be.visible")
	})

	it("Click into a 'menu' and select 'Kontrolladministrasjon", () => {
		cy.get("#dropdown-button").click()
		cy.contains("Kontrolladministrasjon").click()
		wait(1000)
	})

	it("Can click 'Knytt features til roller'", () => {
		cy.get("#feature-role-tab").click()
		wait(1000)
	})

	it("Can see Radio Group and option of roles, click 1st option", () => {
		cy.get('input[type="radio"]').then((radioButtons) => {
			cy.log(`Found ${radioButtons.length} radio buttons`);
		});
		cy.get('input[type="radio"]').first().click();
		wait(1000)
	})

	it("Can see contents in table", () => {
		cy.get("#features-table td").contains("Alle brukere").should("exist")
		wait(1000)
	})
})
