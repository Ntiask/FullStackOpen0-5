const BackendReset = () => {
cy.request('POST', 'http://localhost:3003/api/test/delete')
      const user = {
        name: 'Niko',
        username: 'Admin',
        password: 'pr2jk'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    }

export default BackendReset