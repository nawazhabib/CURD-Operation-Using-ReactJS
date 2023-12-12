import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="/">Table</Navbar.Brand> */}
        <Nav className="me-auto">
            <Nav.Link href="/">Employee</Nav.Link>
            <Nav.Link href="/department">Department</Nav.Link>
            </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;