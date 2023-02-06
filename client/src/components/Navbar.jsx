import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {UserContext} from '../App'
import LogoutModal from './LogoutModal';

function AppNavbar() {
  const context = useContext(UserContext);
  const [show, setShow] = useState(false);

  return (
    <Navbar bg="light" expand="lg" style={{ marginBottom: "2rem" }}>
      <LogoutModal show={show} setShow={() => setShow(false)} />
      <Container>
        <Navbar.Brand as={Link} to="">Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="">Home</Nav.Link>
            {context?.user ?
              <>
                <Nav.Link as={Link} to="#">{context.user.firstName}</Nav.Link>
                <Nav.Link as={Link} to="post/new">Create Post</Nav.Link>
                <Nav.Link onClick={() => setShow(true)}>Logout</Nav.Link>
              </>
              :
              <Nav.Link as={Link} to="login">Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;