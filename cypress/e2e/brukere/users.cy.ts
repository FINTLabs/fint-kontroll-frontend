import {wait} from "@testing-library/user-event/dist/utils";

describe('Check the user page', () => {
    const searchText = 'TEST';
    const userType = 'STUDENT';

    beforeEach(() => {
        const baseUrl = "http://localhost:3000/api";
        cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits`, "orgunits.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits/orgTree`, "orgunits.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/users/?size=5`, "users.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/users/?search=${searchText}&orgUnits=36`, "users.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/users/?userType=${userType}`, "users.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/users`, "users.json");
    });

    it('Go to home and navigate to Brukere', () => {
        cy.goToHome();
        cy.wait(1000)

        cy.get("#dropdown-button").should("be.visible")

        cy.get("#dropdown-button").click()
        cy.contains("a", "Brukere").click()
        wait(1000)
    })

    it('Can see Karen Berg, and the Se Info button', () => {
        cy.get('#row-Karen-Berg').contains('button', 'Se info').should('be.visible')
    })

    it('Check Brukere has filters, search and table of users', () => {
        cy.get('#user-type-select').should('be.visible')
        cy.get('#user-type-select').should('have.value', "")
        cy.get('#user-search').should('exist')
        cy.get('#user-search').should('have.value', '')
        cy.get('#user-table').should('be.visible')
        cy.get('#user-table td').contains('Karen Berg').should('exist')
    })

    it('Pagination (select number of rows in table)', () => {
        cy.get('#pagination').should('be.visible')
    });

    it('Check table length = 10 first, change rows to 5, verify row length is 5', () => {
        cy.get('#user-table').should('be.visible')
           .find('tbody tr')
           .should('have.length', 10);
        cy.get("#select-number-of-rows").select("5")
        wait(1000)
        cy.get('#user-table').should('be.visible')
            .find('tbody tr')
            .should('have.length', 5);
    });

    it('Pagination go to "Neste", and verify page variable is "1"', () => {
        cy.contains("button", "Neste").click()
        cy.wait(1000)

        cy.location('search').then((search) => {
            const params = new URLSearchParams(search);

            const paramValue = params.get('page');

            expect(paramValue).to.equal('1');
        })
    })

    it('Check select usertype (options, clickable)', () => {
        cy.get('#user-type-select').should('exist')
        cy.get('#userType-chip').should('not.exist')
        cy.get('#user-type-select').select("Elev");
        cy.get('#userType-chip').should('have.text', 'Elev')
    })
})