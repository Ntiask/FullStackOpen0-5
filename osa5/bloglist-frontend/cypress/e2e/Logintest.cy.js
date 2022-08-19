describe('Blog app', function() {
  beforeEach(function() {
    //cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Admin')
      cy.get('#password').type('pr2jk')
      cy.get('#login-button').click()
      cy.contains('You are logged in as Niko')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('pr2jk')
      cy.get('#login-button').click()
      cy.contains('Login')
    })
  })
})