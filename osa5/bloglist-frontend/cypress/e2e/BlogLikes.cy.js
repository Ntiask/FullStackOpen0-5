const BackendReset = require('./helpers')

describe('empty spec', () => {
  beforeEach(function() {
      BackendReset()
  })

  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('Admin')
    cy.get('#password').type('pr2jk')
    cy.get('#login-button').click()
    cy.contains('You are logged in as Niko')
    cy.get('#Createablogentry').click()
    cy.get('#title').type('TestBlog')
    cy.get('#Url').type('TestBlog')
    cy.get('#Author').type('TestBlog')
    cy.get('#Submit').click()
    cy.contains('TestBlog')
    cy.get('#viewBlog').click()
    cy.get('#Like').click()
    cy.get('#likePara').contains(1)
  })
})

