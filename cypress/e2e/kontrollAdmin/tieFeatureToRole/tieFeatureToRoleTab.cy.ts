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
		cy.get("#features-to-role").click()
		wait(1000)
	})

	it("Navigate to features-to-role", () => {
		cy.visit('http://localhost:3000/beta/fintlabs-no/system-admin/knytt-rettigheter-til-rolle')
		wait(1000)
		cy.location('pathname').then((pathname) => {
			expect(pathname).to.contain('knytt-rettigheter-til-rolle');
		})
	})

	it("Can see Radio Group and option of roles, click 1st option", () => {
		cy.get('input[type="radio"]').then((radioButtons) => {
			cy.log(`Found ${radioButtons.length} radio buttons`);
		});
		cy.get('input[type="radio"]').first().click();
		wait(1000)
	})

	it("Can see contents in table", () => {
		cy.get("table tr td").contains("Alle brukere").should("exist")
		wait(1000)
	})
})
