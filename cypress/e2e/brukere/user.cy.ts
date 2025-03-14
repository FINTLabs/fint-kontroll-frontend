describe('Check the user detail page', () => {
    before('Set default size cookie', () => {
        cy.setCookie('size', '25');
        cy.wait(1000);
        cy.getCookie('size').then((cookie) => expect(cookie?.value).to.be.equal('25'));
    });

    it("Navigate to Karen Berg's information page and click 'Se Info'", () => {
        cy.goToInfo();
        cy.wait(1000);
    });

    it('Check heading on user info page', () => {
        cy.get('h1').contains('Brukerinformasjon');
    });

    it('Check list of user info(Fullname and orgUnit)', () => {
        cy.get('ul').should('exist');
        cy.get('li')
            .first()
            .within(() => {
                cy.get('h3').contains('Navn');
                cy.get('p').contains('Karen Berg');
            });
        cy.get('li')
            .eq(2)
            .within(() => {
                cy.get('h3').contains('Organisasjonsenhet');
                cy.get('p').contains('VGMIDT Midtbyen videregående skole');
            });
    });

    it('Check resource table (exists), number of rows is 6', () => {
        cy.get('#resources-for-user-table').should('be.visible').find('tbody tr').should('exist');
        cy.get('#resources-for-user-table')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 6);
    });

    it('Pagination exists and visible, select number of rows to be "5"', () => {
        cy.get('#select-number-of-rows').should('be.visible');
        cy.get('#pagination').should('not.exist');
        cy.get('#select-number-of-rows').select('5');
        cy.wait(1000);
        cy.get('#resources-for-user-table')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 5);
        cy.get('#pagination').should('be.visible');
    });
});
