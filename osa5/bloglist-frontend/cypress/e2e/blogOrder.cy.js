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
    cy.get('#Url').type('Most liked one')
    cy.get('#Author').type('TestBlog')
    cy.get('#Submit').click()
    cy.contains('TestBlog')
    cy.get('#viewBlog').click()
    cy.get('#Like').click()
    cy.get('#Like').click()
    cy.get('#Like').click()
    cy.get('#Like').click()
    cy.get('#likePara').contains(4)
    cy.get('#Createablogentry').click()
    cy.get('#title').type('TestBlog1')
    cy.get('#Url').type('Less Liked One')
    cy.get('#Author').type('TestBlog1')
    cy.get('#Submit').click()
    cy.contains('TestBlog1')
    cy.reload()
    cy.get('#viewBlog').click()
    cy.contains('Most liked one')

  })
})

