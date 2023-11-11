describe('e2e to get top rated movie by genre', function () {

    it('get top rated movie in All genre', function () {

        cy.viewport(1920, 931)

        cy.visit('http://localhost:3000/')

        cy.get('.row > .col > .tabs > .tab:nth-child(1) > a').click();
        cy.get('.input-field > .select-wrapper > .dropdown-trigger').click();
        cy.get('.dropdown-content > :nth-child(3)').click({ force: true }); // 3rd element is rating
        cy.get('.col:nth-child(1) > .row > .col > .card > .card-image > img').click();
        cy.get('.card-content > .row > .col > .btn-floating > .material-icons').click();
    })

    it('get top rated movie in Documentary genre', function () {

        cy.viewport(1920, 931)

        cy.visit('http://localhost:3000/')

        cy.get('.row > .col > .tabs > .tab:nth-child(2) > a').click();
        cy.get('.input-field > .select-wrapper > .dropdown-trigger').click();
        cy.get('.dropdown-content > :nth-child(3)').click({ force: true }); // 3rd element is rating
        cy.get('.col:nth-child(1) > .row > .col > .card > .card-image > img').click();
        cy.get('.card-content > .row > .col > .btn-floating > .material-icons').click();
    })

    it('get top rated movie in Comedy genre', function () {

        cy.viewport(1920, 931)

        cy.visit('http://localhost:3000/')

        cy.get('.row > .col > .tabs > .tab:nth-child(3) > a').click();
        cy.get('.input-field > .select-wrapper > .dropdown-trigger').click();
        cy.get('.dropdown-content > :nth-child(3)').click({ force: true }); // 3rd element is rating
        cy.get('.col:nth-child(1) > .row > .col > .card > .card-image > img').click();
        cy.get('.card-content > .row > .col > .btn-floating > .material-icons').click();
    })

    it('get top rated movie in Horror genre', function () {

        cy.viewport(1920, 931)

        cy.visit('http://localhost:3000/')

        cy.get('.row > .col > .tabs > .tab:nth-child(4) > a').click();
        cy.get('.input-field > .select-wrapper > .dropdown-trigger').click();
        cy.get('.dropdown-content > :nth-child(3)').click({ force: true }); // 3rd element is rating
        cy.get('.col:nth-child(1) > .row > .col > .card > .card-image > img').click();
        cy.get('.card-content > .row > .col > .btn-floating > .material-icons').click();
    })


})
