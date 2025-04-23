describe('Check the user detail page', () => {
    it("Navigate to Joanna Kristoffersen's Ny Tildeling page", () => {
        cy.setCookie('size', '25');
        cy.goToBrukereNyTildeling();
        cy.wait(1000);
    });

    it('Check heading on Ny Tildeling page', () => {
        cy.get('h1').contains('Ny tildeling');
    });

    it('Test search on resource name, then remove the chip filter,', () => {
        cy.get('#search-resource').should('exist');
        cy.get('#search-resource').type('solid');
        cy.get('#search-resource').type('{enter}');
        cy.wait(1000);
        cy.get('#resources-table').find('tbody tr').should('have.length', 1);
    });

    it('Test filter for appliasjonskategori', () => {
        cy.get('#select-applicationcategory').should('exist');
        cy.get('#select-applicationcategory').select('Fagsystemer');
        cy.wait(1000);

        cy.location('search').should('include', 'applicationcategory');

        cy.location('search').then((search) => {
            const params = new URLSearchParams(search);

            const paramValue = params.get('applicationcategory');

            expect(paramValue).to.equal('Fagsystemer');
        });

        cy.get('#select-applicationcategory').select('');
        cy.wait(1000);

        cy.location('search').should('not.include', 'applicationcategory');
    });
});
