import {wait} from "@testing-library/user-event/dist/utils"
import {goToRessurser} from "../../support/commands";

describe('Check resource home page', () => {

    const searchText = 'Adobe';
    const userType = 'STUDENT';

    // beforeEach(() => {
    //     const baseUrl = "http://localhost:3000/api";
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits`, "orgunits.json");
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits/orgTree`, "orgunits.json");
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/users/?size=5`, "users.json");
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/users/?search=${searchText}&orgUnits=36`, "users.json");
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/users/?userType=${userType}`, "users.json");
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/users`, "users.json");
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/resources`, "resources.json");
    // });

    it('Navigate to Ressurser', () => {
        goToRessurser()
        wait(1000)
    })

    it('Filter and search exists', () => {
        cy.get('#search-resource').should('exist')
        cy.get('#search-resource').should('be.visible')
        cy.get('#org-unit-filter').should('exist')
        cy.get('#org-unit-filter').should('be.visible')
    })

    it('Test searchField, and clear input', () => {
        cy.get('#search-resource').should('have.value', '')
        cy.get('#search-resource').type(searchText).should('have.value', searchText)
    })

    it('Check table (exists, has 7 rows)', () => {
        cy.get('#resources-table')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 7);
    });
})

