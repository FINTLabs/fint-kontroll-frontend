describe("Test suite for 'Definer rolle'", () => {
    it('can render home page', () => {
        cy.goToHome();
        cy.wait(1000);
    });

    it('can see dropdown-button', () => {
        cy.get('#dropdown-button').should('be.visible');
    });

    it("Click into a 'menu' and select 'Kontrolladministrasjon", () => {
        cy.get('#dropdown-button').click();
        cy.get('div[role="menuitem"]').contains('Definer rolle').click();
        cy.wait(1000);
    });

    it('Can see Radio Group and option of roles, click 2nd option', () => {
        cy.get('input[type="radio"]').then((radioButtons) => {
            cy.log(`Found ${radioButtons.length} radio buttons`);
        });
        cy.get('input[type="radio"]').eq(1).click();
        cy.wait(1000);
    });

    it('Can see table of features from the selected access role', () => {
        cy.get('#permissions-table td').contains('featureName1').should('exist');
    });
});
