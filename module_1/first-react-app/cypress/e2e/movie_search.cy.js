describe('search movie with string and view its description', function() {

    it('searches movie panda and clicks on it to view description', function() {
   
       cy.viewport(1920, 931)
       cy.visit('http://localhost:3000/')

       cy.get('.card-content > .row > .col > .col > #search-input').click()
       cy.get('.card-content > .row > .col > .col > #search-input').type('pandas')
       cy.get('.card-content > .row > .col > .col > .btn-large').click()
       cy.get('.row > .col > .card > .card-image > img').click()
       cy.get('.card-content > .row > .col > .btn-floating > .material-icons').click()
    })
   
   })