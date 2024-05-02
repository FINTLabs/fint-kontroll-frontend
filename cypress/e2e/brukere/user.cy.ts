import {wait} from "@testing-library/user-event/dist/utils";
import {goToInfo} from "../../support/commands";

describe('Check the user detail page', () => {

    // beforeEach(() => {
    //     const baseUrl = "http://localhost:3001/";
    //     cy.interceptAndReturnFile("GET", `${baseUrl}api/users/?size=5`, "users.json");
    //     cy.interceptAndReturnFile("GET", `${baseUrl}api/users/442/?size=5`, "users.json");
    //     cy.interceptAndReturnFile("GET", `${baseUrl}api/users/442`, "user.json");
    //     cy.interceptAndReturnFile("GET", `${baseUrl}api/assignments/user/442/resources`, "assignments.json");
    // });

    it("Navigate to Karen Berg's information page and click 'Se Info'", () => {
        cy.goToInfo();
        cy.wait(1000)
    })

    it('Check heading on user info page', () => {
        cy.get('h1').contains( 'Brukerinformasjon')
    });


    it('Check list of user info(Fullname and orgUnit)', () => {
        cy.get('#user-full-name').should('exist')
        cy.get('#user-full-name').should('contain.text', 'Karen Berg')
        cy.get('#org-unit').should('exist')
        cy.get('#org-unit').should('contain.text', 'VGMIDT Midtbyen videregående skole')
    });

    it('Check resource table (exists), number of rows is 6', () => {
        cy.get('#resources-for-user-table')
            .should('be.visible')
            .find('tbody tr')
            .should('exist')
        cy.get('#resources-for-user-table').should('be.visible')
            .find('tbody tr')
            .should('have.length', 6);
    });

    it('Pagination exists and visible, select number of rows to be "5"', () => {
        cy.get('#pagination').should('be.visible')
        cy.get("#select-number-of-rows").select("5")
        wait(1000)
        cy.get('#resources-for-user-table').should('be.visible')
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

    it('Pagination go to "previous page"', () => {
        cy.contains("button", "Forrige").click()
        cy.wait(1000)

        cy.location('search').then((search) => {
            const params = new URLSearchParams(search);

            const paramValue = params.get('page');

            expect(paramValue).to.equal('0');
        })
    })
});