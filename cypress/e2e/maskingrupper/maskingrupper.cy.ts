describe('Check device page with mock data', () => {
    before('Set default size cookie', () => {
        cy.setCookie('size', '25');
        cy.wait(1000);
        cy.getCookie('size').then((cookie) => expect(cookie?.value).to.be.equal('25'));
    });

    it('Navigate to Maskingrupper', () => {
        cy.goToMaskinGrupper();
        cy.wait(1000);
    });

    it('Pagination (select number of rows in table)', () => {
        cy.get('#select-number-of-rows').should('be.visible');
    });

    it('Check table exists, cookie "size" is 25, has 5 rows, then change to 5 rows and confirm length', () => {
        cy.getCookie('size').then((cookie) => {
            expect(cookie?.value).to.equal('25');
        });
        cy.get('#device-table').should('be.visible').find('tbody tr').should('have.length', 5);
        cy.get('#select-number-of-rows').select('5');
        cy.wait(1500);

        cy.get('#device-table').should('be.visible').find('tbody tr').should('have.length', 5);
    });

    it('Searching for deviceGroup', () => {
        const searchText = 'Group 5';
        cy.get('#search-device').type(searchText).should('have.value', searchText);
        cy.get('#search-device').type('{enter}');
        cy.wait(1000);
        cy.get('#device-table').find('tr td').should('contain', 'Device Group 5');
    });
});
