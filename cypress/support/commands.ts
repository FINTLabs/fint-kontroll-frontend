/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import { Method } from 'cypress/types/net-stubbing';

declare global {
    namespace Cypress {
        interface Chainable {
            goToHome: typeof goToHome;
            interceptAndReturnFile: typeof interceptAndReturnFile;
            setupFetchMocks: typeof setupFetchMocks;
            goToInfo: typeof goToUser;
            goToGrupper: typeof goToGrupper;
            goToRessurser: typeof goToRessurser;
            goToSpecificResource: typeof goToSpecificResource;
            goToBrukereNyTildeling: typeof goToBrukereNyTildeling;
            goToResourceAdmin: typeof goToResourceAdmin;
            goToCreateResource: typeof goToCreateResource;
            goToDeleteResource: typeof goToDeleteResource;
            goToResourceAdminWithResponse: typeof goToResourceAdminWithResponse;
            goToSettings: typeof goToSettings;
            goToBrukere: typeof goToBrukere;
        }
    }
}

export function interceptAndReturnFile(method: Method, url: string, fixturePath: string) {
    cy.intercept(method, url, {
        fixture: fixturePath,
    }).as(fixturePath);
}

Cypress.Commands.add('interceptAndReturnFile', interceptAndReturnFile);

export function goToHome() {
    return cy.visit('http://localhost:3000/fintlabs-no');
}

Cypress.Commands.add('goToHome', goToHome);

export function goToBrukere() {
    return cy.visit('http://localhost:3000/fintlabs-no/brukere');
}

Cypress.Commands.add('goToBrukere', goToBrukere);

export function goToUser() {
    return cy.visit('http://localhost:3000/fintlabs-no/brukere/455/org/194');
}

Cypress.Commands.add('goToInfo', goToUser);

export function goToGrupper() {
    return cy.visit('http://localhost:3000/fintlabs-no/grupper');
}

Cypress.Commands.add('goToGrupper', goToGrupper);

export function goToRessurser() {
    return cy.visit('http://localhost:3000/fintlabs-no/ressurser');
}

Cypress.Commands.add('goToRessurser', goToRessurser);

export function goToSpecificResource() {
    return cy.visit('http://localhost:3000/fintlabs-no/ressurser/5/bruker-tildelinger');
}

Cypress.Commands.add('goToSpecificResource', goToSpecificResource);

export function goToBrukereNyTildeling() {
    return cy.visit('http://localhost:3000/fintlabs-no/bruker/455/org/194/ny-tildeling');
}

Cypress.Commands.add('goToBrukereNyTildeling', goToBrukereNyTildeling);

export function goToResourceAdmin() {
    return cy.visit('http://localhost:3000/fintlabs-no/tjeneste-admin?status=ACTIVE');
}

Cypress.Commands.add('goToResourceAdmin', goToResourceAdmin);

export function goToResourceAdminWithResponse() {
    return cy.visit(
        'http://localhost:3000/fintlabs-no/tjeneste-admin??status=ACTIVE&responseCode=204'
    );
}

Cypress.Commands.add('goToResourceAdminWithResponse', goToResourceAdminWithResponse);

export function goToCreateResource() {
    return cy.visit(
        'http://localhost:3000/fintlabs-no/tjeneste-admin/opprett-ny-applikasjonsressurs?responseCode=201'
    );
}

Cypress.Commands.add('goToCreateResource', goToCreateResource);

export function goToDeleteResource() {
    return cy.visit('http://localhost:3000/fintlabs-no/resource-admin/resource/:id/delete');
}

Cypress.Commands.add('goToDeleteResource', goToDeleteResource);

export function goToSettings() {
    return cy.visit('http://localhost:3000/fintlabs-no/innstillinger');
}
Cypress.Commands.add('goToSettings', goToSettings);

export const setupFetchMocks = () => {
    beforeEach(() => {
        const baseUrl = 'http://localhost:3000/fintlabs-no/api';

        cy.interceptAndReturnFile(
            'GET',
            `http://localhost:8062/fintlabs-no/api/users/me`,
            'authenticatedUser.json'
        );
        cy.interceptAndReturnFile(
            'GET',
            `http://localhost:53989/fintlabs-no/api/accessmanagement/v1/user*`,
            'users.json'
        );
        cy.interceptAndReturnFile(
            'GET',
            `http://localhost:53989/fintlabs-no/api/roles*`,
            'roles.json'
        );
        cy.interceptAndReturnFile(
            'GET',
            `http://localhost:53989/fintlabs-no/api/orgunits`,
            'orgunits.json'
        );
        cy.interceptAndReturnFile(
            'GET',
            `http://localhost:53989/fintlabs-no/api/accessmanagement/v1/accessrole`,
            'allAccessRoles.json'
        );
        cy.interceptAndReturnFile(
            'GET',
            `${baseUrl}/accessmanagement/v1/accesspermission/accessrole/*`,
            'singleAccessRole.json'
        );
        cy.interceptAndReturnFile('GET', `${baseUrl}/accessmanagement/v1/feature`, 'features.json');
        cy.interceptAndReturnFile(
            'POST',
            `http://localhost:8063/fintlabs-no/api/resources/v1`,
            'createResource.json'
        );
    });
};
Cypress.Commands.add('setupFetchMocks', setupFetchMocks);
