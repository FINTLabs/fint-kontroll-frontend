import { setupFetchMocks } from "../../../support/commands"
import { wait } from "@testing-library/user-event/dist/utils"

setupFetchMocks()

describe("Check 'Knytt features til roller'", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	// it("Can click 'Knytt features til roller'", () => {
	// 	cy.get("#feature-role-tab").click()
	// 	wait(1000)
	// })
	//
	// it("Can select access role", () => {
	// 	cy.get("select").select("accessRole1")
	// 	wait(1000)
	// })
	//
	// it("Can see contents in table", () => {
	// 	cy.get("#features-table td").contains("Alle brukere").should("exist")
	// 	wait(1000)
	})
})
