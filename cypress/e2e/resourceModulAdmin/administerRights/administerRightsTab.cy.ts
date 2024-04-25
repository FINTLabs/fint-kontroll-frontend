import { wait } from "@testing-library/user-event/dist/utils"
import { setupFetchMocks } from "../../../support/commands"

setupFetchMocks()

describe("Test suite for 'Se brukere med roller'", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	// it("can see navigation-tab", () => {
	// 	cy.get("#navigation-bar").should("be.visible")
	// })
	//
	// it("Click into a 'Se brukere med roller'", () => {
	// 	cy.get("#see-users-tab").click()
	// 	wait(1000)
	// })
	//
	// it("Can see a table with at least one example user", () => {
	// 	cy.get("#users-table").should("be.visible")
	// 	cy.get("#users-table td").contains("Petter Pettersen").should("exist")
	// })
})
