import {wait} from "@testing-library/user-event/dist/utils";

describe('Check roles page with mock data', () => {

    // beforeEach(() => {
    //     // Replace with your actual authorization token
    //     const myKey = 'eyJraWQiOiI1MjgyMzAwMDc0MjY0OTk0OTYzODU3OTYiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lkcC5mZWxsZXNrb21wb25lbnQubm8vbmlkcC9vYXV0aC9uYW0iLCJqdGkiOiJhNTMzYmI1Ny1jYTRiLTQ0MjMtOTRkZi01NDBlYmI5Nzc5YWYiLCJhdWQiOiIyYzg4NGM3Mi01MzI5LTRlMmItOWM5MC1kY2VhMDg0OThmNmIiLCJleHAiOjE2ODEzMDA5MDAsImlhdCI6MTY4MTI5NzMwMCwibmJmIjoxNjgxMjk3MjcwLCJzdWIiOiI1MGVlZGY1MDI5MmMxOTQzYTQ0MDUwZWVkZjUwMjkyYyIsIl9wdnQiOiJRR3piVXVPOTMrV3JSbEwxa05iYkJDQ0srczdaZUpYekEvK0Z5aXg3YTE1a1ZyNmtMd2Ryb01Ga3ovSGh5NHd1QUFMOS9FRDVKOWEveFpEYTJZVUpLeDUxcllsZ2MvZjRWZ0tMZ0g4VmM5SytTNGR2UUdsSmJQUVF4UWtpNFNOeVpQb2M0VlRYeXhvemhsOVo2T2tsVDdvT0k2bGpmU2tlUElSNFZTSWQ0VjFFbnlzYTB2L2VaM0s0aVhXdk5jNlBFWmwrbDhBN25GTURMeERJTUVJTEFUVGVWWDFQZkZobDJTL0FYYmFBSmV4Qkx5d3p5cVppZkdGN3ZUV0pJREg0NG1Dajc2SEoxYzg3Unc0c0J2dytNMEcxd3ozYUZKUTZpUmYxYjB3Y0hjQkRCdFpWZ0pOV0RzWEo3bnpEUENwUHJ4YmRvY21MU0RzUzBsU3R3MXpRK0tuMGpTbEc2MWNiZC9GNWlqVTQwYWN1ZHgzd0dxd3F1THdUeWxVMFlEcVZQcTlKemdYUEhwa044dHgzNkd5Ykt2dGNXdElSN3h3Yk41ek4wdmJBUGFmUzBrSkF3VU1VdnNTakMxVVk1NWRhS1ByS05aOCt3T2lFR2Y2dWIzbzZrTkJXUEtpYzh1VGVaZTB0UlZFRStBWUxwU3pqU29tTmwvSm5VdEJMNEkrSXQ5bmpWTmR3dnkyK0NmQmZjemZ4c1VOSDFkTlE0VER0dVNCc2hUZFRaazJNZ2J1WitOV3JyYU92UmNLZzNYOWZwYjF4Tk91NExiMTlkSXh1cC9HNXcwcUhkRUNjQUNjR05KdkxqelJlZzUxWUlxWVh1cXh3Z29JTytzWGR2eEV6K2tZOVN2WkNCb1lHY3ZncDJlTWVtUT09LjciLCJzY29wZSI6WyJlbmQtdXNlci1wcm9maWxlIl0sIm9yZ2FuaXphdGlvbmlkIjoidmlnby5ubyIsImdpdmVubmFtZSI6Ikplbm5pZmVyIiwic3VybmFtZSI6IlN0cmFuZCIsInJvbGVzIjpbImF1dGhlbnRpY2F0ZWQiLCJodHRwczovL3JvbGUtY2F0YWxvZy52aWdvaWtzLm5vL3ZpZ28vZWxldmZha3R1cmVyaW5nL2FkbWluIl0sImRpc3BsYXluYW1lIjoiSmVubmlmZXIgU3RyYW5kIiwidGVuYW50aWQiOiI3YTliOWJlNi0xN2E5LTRiYmQtYmQ3Zi1hMWVkMDZiOTA3MDkiLCJvYmplY3RpZGVudGlmaWVyIjoiMjg2NWFjYjktNGYzZi00YzMxLWFkODUtODQ3ZDlkYTQwMWViIiwib3JnYW5pemF0aW9ubnVtYmVyIjoiOTk4MjgzOTE0IiwicHJpbmNpcGFsTmFtZSI6Implbm5pZmVyLnN0cmFuZEB2aWdvaWtzLm5vIiwiZW1wbG95ZWVJZCI6IjEyMzQ1Njc4OSIsImVtYWlsIjoiamVubmlmZXIuc3RyYW5kQHZpZ29pa3Mubm8iLCJfdGFyZ2V0IjoiZmludC1hcGkifQ.g7pi6vCi50UDGf9k5xr0hhKWc233KYaw1x3xlillocGWzE6tpVBEAevb4plRW9gXI4fRdcOQOgl_zj3puZmbulDgJb0y81f4-rbiUunma944qonmGAJ2cCYlJolbVpiNp_PmKQ9DPMIGG45LFU9NOH12XPwwCrljtDXpSJlpvtcLtsnOYmCqyD5DKWB3t_D-mHHCy4pWfUx6A2k5pESGmlF4yCd1sDGaYshCoujBvpf9uQ4xY0M_ajBoAOy1iQZWyRSSAOMD1_qwBbXdDSv4KDJzJM4_3Wvo-YvKfvUGD6Pg_ugM3HtXguIPF30cbzor6OWRr4pkhP7FUX-NqsEauA';
    //     cy.intercept('GET', 'http://localhost:3000/api/orgunits/', (req) => {
    //         // Modify the URL
    //         req.url = 'http://localhost:8081/api/orgunits/';
    //         req.headers['Authorization'] = `Bearer ${myKey}`;
    //     }).as('getOrgUnits');
    // })

    it('Navigate to Grupper', () => {
        cy.goToGrupper();
        wait(1000)
    })

    it('Pagination (select number of rows in table)', () => {
        cy.get('#pagination').should('be.visible')
    });

    it('Check table exists and has 10 rows, then change to 5 rows', () => {
        cy.get('#role-table').should('be.visible')
            .find('tbody tr')
            .should('have.length', 10);
        cy.get("#select-number-of-rows").select("5")
        wait(1000)
        cy.get('#role-table').should('be.visible')
            .find('tbody tr')
            .should('have.length', 5);
    });

    it('Searching creates a filter, which can be removed.', () => {
        const searchText = 'oko';
        cy.get('#search-role').type(searchText).should('have.value', searchText);
        cy.get('#search-role').type('{enter}');
        cy.wait(1000)

        cy.get('#role-table')
            .find('tr td')
                .should('contain', 'OKO');
        cy.get("#search-name-chip").should('be.visible')
    });

    it('Remove filter and verify chips is gone', () => {
        cy.get('#search-role').clear().should('have.value', "");
        cy.get('#search-role').type('{enter}');
        cy.wait(1000)
        cy.get("#search-name-chip").should('not.exist')
    })

    it('Includes sub-org-units, and update table with result', () => {
        cy.get('#org-unit-filter').should('be.visible').click()

        cy.get('#sub-org-unit-switch').check()

        cy.get('.org-unit-checkbox').first().click()

        cy.get("button").contains("Sett filter").click()
        wait(1000)

        cy.get('#role-table')
            .find('tr td')
                .contains("DIGIT");
    })
});
