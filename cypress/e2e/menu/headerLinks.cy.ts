describe('Check header links', () => {
    it('Go to home and navigate to Brukere and back again', () => {
        cy.goToHome();
        cy.wait(1000);

        cy.get('#dropdown-button').should('be.visible');

        cy.get('#dropdown-button').click();
        cy.get('div[role="menuitem"]').contains('Brukere').click();
        cy.wait(1000);

        cy.get('#header-logo').click();
        cy.wait(1000);

        cy.location('pathname').then((pathname) => {
            expect(pathname).to.equal('/beta/fintlabs-no');
        });

        cy.get('#welcome-text').should('be.visible');
    });
});
