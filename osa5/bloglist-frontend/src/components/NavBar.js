
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'

const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
const user = loggedUserJSON !== null ? JSON.parse(loggedUserJSON).name : "anonymous"

const NavigationBar = () => {return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Container>
          <LinkContainer to="/">
          <Navbar.Brand>BlogList application</Navbar.Brand>
          </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/blogs">
                <Nav.Link>Blogs</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
              <LinkContainer to="/login">
                <Nav.Link>{user !== null ? `Logged in as ${user}`: 'Login'}</Nav.Link>
            </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            
          </Container>
        </Navbar>
        </div>  
      )
}

export default NavigationBar