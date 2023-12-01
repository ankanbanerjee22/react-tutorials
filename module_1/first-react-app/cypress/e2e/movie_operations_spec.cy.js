
describe('e2e test to validate movie operations', function() {

    it('test to add a movie, then update details and then delete the added movie', function() {
   
        cy.viewport(1920, 931)
 
        // adding movie with name test movie 12345
        cy.visit('http://localhost:3000/')
        cy.get('.card > .card-content > .row > .col > .btn-large').click()
        cy.get('.col > .row > .col > .input-style-form > #title').click()
        cy.get('.col > .row > .col > .input-style-form > #title').type('test movie 12345')
        cy.get('.col > .row > .col > .input-style-form > #release_date').click()
        cy.get('.col > .row > .col > .input-style-form > #release_date').click()
        cy.get('.col > .row > .col > .input-style-form > #release_date').type('2023-11-30')
        cy.get('div > div > .col > .row:nth-child(2) > .m8').click()
        cy.get('.col > .row > .col > .input-style-form > #poster_path').click()
        cy.get('.col > .row > .col > .input-style-form > #poster_path').type('https://d1csarkz8obe9u.cloudfront.net/posterpreviews/testing-logo-design-template-ce84480d61b3db9a8e1522a99875832f_screen.jpg?ts=1615794516')
        cy.get('.col > .row > .col > .input-style-form > #vote_average').click()
        cy.get('.col > .row > .col > .input-style-form > #vote_average').type('5')
        cy.get('.col > .row > .col > .input-style-form > #runtime').click()
        cy.get('.col > .row > .col > .input-style-form > #runtime').type('55')
        cy.get('.row > .col > .input-style-form > .select-wrapper > .dropdown-trigger').click()
        cy.get('.row > .col > .input-style-form > .select-wrapper > #dropdown').select('Documentary', {force:true})
        cy.get('.modal-content > div > div > .col > .row:nth-child(4)').click()
        cy.get('.col > .row > .col > .input-style-form > #overview').click().type('something random')
        cy.get('div > .col > .row > .col > .btn-large:nth-child(2)').click()

        // editing movie info
        cy.visit('http://localhost:3000/')
        cy.get('.card-content > .row > .col > .col > #search-input').click()
        cy.get('.card-content > .row > .col > .col > #search-input').type('test movie 12345')
        cy.wait(500)
        cy.get('.card-content > .row > .col > .col > .btn-large').click()
        cy.get('.card-content > .row > .col > .col > .btn-large').click()
        cy.get('.card > .card-image > .movie-menu > .btn-floating > #menu-id').click()
        cy.get('.card-image > .movie-menu > #dropdown-test\\ movie\\ 12345 > li:nth-child(1) > a', { timeout: 10000 })
        .should('exist')
        .click();
        cy.get('.col > .row > .col > .input-style-form > #runtime').click()
        cy.get('.col > .row > .col > .input-style-form > #runtime').type('8')
        cy.get('.col > .row > .col > .input-style-form > #overview').click().type(' updated')
        cy.get('div > .col > .row > .col > .btn-large:nth-child(2)').click()

       // deleting the test movie
        cy.visit('http://localhost:3000/')
        cy.get('.card-content > .row > .col > .col > #search-input').click()
        cy.get('.card-content > .row > .col > .col > #search-input').type('test movie 12345')
        cy.wait(500)
        cy.get('.card-content > .row > .col > .col > .btn-large').click()
        cy.get('.card-content > .row > .col > .col > .btn-large').click()
        cy.get('.card > .card-image > .movie-menu > .btn-floating > #menu-id').click()
        cy.get('.card-image > .movie-menu > #dropdown-test\\ movie\\ 12345 > li:nth-child(2) > a', { timeout: 10000 })
        .should('exist')
        .click();
        cy.get('div > .bordered-form > .row > .col > .btn-large').click()

        cy.visit('http://localhost:3000')
    })
   
   })
   