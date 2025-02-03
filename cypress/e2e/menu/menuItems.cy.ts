import { wait } from '@testing-library/user-event/dist/utils';

describe('Check menu items for', () => {
    it('Systemadministrator', () => {
        cy.setCookie('cypresstestuser', 'sa');
        wait(1000);
        cy.getCookie('cypresstestuser').then((cookie) => expect(cookie.value).to.be.equal('sa'));

        cy.goToHome();
        cy.wait(1000);

        cy.get('#dropdown-button').should('be.visible');

        cy.get('#dropdown-button').click();
        cy.get('#define-role').should('be.visible');
    });

    it('Ressursadministrator', () => {
        cy.setCookie('cypresstestuser', 'ra');
        wait(1000);
        cy.getCookie('cypresstestuser').then((cookie) => expect(cookie.value).to.be.equal('ra'));

        cy.goToHome();
        cy.wait(1000);

        cy.get('#dropdown-button').should('be.visible');

        cy.get('#dropdown-button').click();
        cy.get('#define-role').should('not.exist');
        cy.get('#resource-module-admin').should('be.visible');
    });

    it('Tjenesteadministrator', () => {
        cy.setCookie('cypresstestuser', 'ta');
        wait(1000);
        cy.getCookie('cypresstestuser').then((cookie) => expect(cookie.value).to.be.equal('ta'));

        cy.goToHome();
        cy.wait(1000);

        cy.get('#dropdown-button').should('be.visible');

        cy.get('#dropdown-button').click();
        cy.get('#define-role').should('not.exist');
        cy.get('#resource-module-admin').should('not.exist');
        cy.get('#service-admin').should('be.visible');
    });

    it('Tildeler', () => {
        cy.setCookie('cypresstestuser', 'td');
        wait(1000);
        cy.getCookie('cypresstestuser').then((cookie) => expect(cookie.value).to.be.equal('td'));

        cy.goToHome();
        cy.wait(1000);

        cy.get('#dropdown-button').should('be.visible');

        cy.get('#dropdown-button').click();
        cy.get('#define-role').should('not.exist');
        cy.get('#resource-module-admin').should('not.exist');
        cy.get('#service-admin').should('not.exist');
        cy.get('#users').should('be.visible');
    });
});
