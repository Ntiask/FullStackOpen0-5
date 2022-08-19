describe('Blog app', function() {
  // ...

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/test/delete')
      const user = {
        name: 'Niko',
        username: 'Admin',
        password: 'pr2jk'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.visit('http://localhost:3000')
      cy.get('#username').type('Admin')
      cy.get('#password').type('pr2jk')
      cy.get('#login-button').click()
      cy.contains('You are logged in as Niko')
    })

    it('A blog can be created', function() {
      cy.get('#Createablogentry').click()
      cy.get('#title').type('TestBlog')
      cy.get('#Url').type('TestBlog')
      cy.get('#Author').type('TestBlog')
      cy.get('#Submit').click()
      cy.contains('TestBlog')
    })
  })

})