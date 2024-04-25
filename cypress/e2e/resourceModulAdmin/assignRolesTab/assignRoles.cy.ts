import { wait } from "@testing-library/user-event/dist/utils"
import { setupFetchMocks } from "../../../support/commands"

setupFetchMocks()

describe("Check resources-admin", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	// it("can see navigation-tab", () => {
	// 	cy.get("#navigation-bar").should("be.visible")
	// })
	//
	// it("can click 'Tildel rettigheter'", () => {
	// 	cy.get("#assign-role-tab").click()
	// 	wait(1000)
	// })
	//
	// it("Check toolbar", () => {
	// 	cy.get("#toolbar-id").should("be.visible")
	// })
	//
	// it("Pagination (change count, change page, new lists)", () => {
	// 	cy.get("#pagination").should("be.visible")
	// })
	//
	// it("Check tildel-rettigheter-table", () => {
	// 	cy.get("#rettigheter-table-delegation").should("be.visible")
	// })
})
