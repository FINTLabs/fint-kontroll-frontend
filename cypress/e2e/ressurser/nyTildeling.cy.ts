// describe('Check the assignment button after assign', () => {
//
//     const baseUrl = "http://localhost:3000";
//     beforeEach(() => {
//         cy.interceptAndReturnFile("GET", `${baseUrl}/api/resources`, "resources.json");
//         cy.interceptAndReturnFile("GET", `${baseUrl}/api/resources/1`, "resourceDetailed.json");
//         cy.interceptAndReturnFile("GET", `${baseUrl}/api/users/?size=5`, "users.json");
//         // cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "assignments.json");
//
//         // cy.intercept("DELETE", `${baseUrl}/api/assignments/15`, "afterCreateAssignment.json").as('afterDeleted');
//
//     });
//
//     it('Check if assign button is disabled after assignment', () => {
//         cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "afterCreateAssignment.json");
//         cy.goToInfo();
//         cy.wait(2000)
//         cy.get('#buttonAddAssignment-109').should('have.text', 'Tildelt')
//         cy.get('#buttonAddAssignment-109').should('be.disabled')
//
//     });
//
//     it('Show disabled button for assigned users', () => {
//         cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "afterCreateAssignment.json");
//         cy.goToInfo();
//         cy.wait(2000)
//         cy.get('#buttonAddAssignment-109').should('have.text', 'Tildelt')
//         cy.get('#buttonAddAssignment-109').should('be.disabled')
//     });
//
//     it('Delete assignment', () => {
//         cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "afterCreateAssignment.json");
//         cy.goToInfo();
//         cy.wait(2000)
//         cy.get('#buttonDeleteAssignment-109').should('exist')
//         cy.get('#buttonDeleteAssignment-109').should('have.text', 'Slett')
//         cy.get('#buttonDeleteAssignment-109').click()
//         cy.get('#delete-dialog').should('exist')
//         cy.wait(2000)
//         cy.get('#delete-button').should('exist')
//         cy.wait(2000)
//         cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "assignments.json");
//         cy.get('#delete-button').click()
//     });
//
//     it('Check assignment table (switching tables, and button text)', () => {
//         cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "assignments.json");
//         cy.goToInfo();
//         cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments?size=1000`, "afterCreateAssignment.json");
//         cy.get('#button-only-assigned').should('exist')
//         cy.get('#button-only-assigned').should('have.text', 'Se kun tildelte')
//         cy.get('#button-only-assigned').click()
//         cy.get('#assignedUserTable')
//             .should('be.visible')
//         cy.get('#button-only-assigned').should('exist')
//         cy.get('#button-only-assigned').should('have.text', 'Se alle brukere')
//         cy.get('#button-only-assigned').click()
//         cy.get('#userTable').should('exist')
//     });

//     it('Button for adding assignment to user', () => {
//         cy.goToInfo();
//         cy.get('#buttonAddAssignment-109').should('exist')
//         cy.wait(1000)
//         cy.get('#buttonAddAssignment-109').should('have.text', 'Tildel')
//         cy.get('#buttonAddAssignment-109').click()
//         cy.wait(1000)
//         cy.wait('@postValueconverting').its('request.body').should('deep.equal', {
//                 resourceRef: "1",
//                 userRef: "109",
//                 organizationUnitId: "36"
//             }
//         )
//     });
//})