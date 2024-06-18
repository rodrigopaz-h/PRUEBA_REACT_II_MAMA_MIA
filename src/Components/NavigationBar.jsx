import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "../context/ProductsContext";

const NavigationBar = () => {
  const { calculateTotal } = useCart();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">🍕 Pizzería Mamma Mia!</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/carrito">
              <span>
              <FontAwesomeIcon icon={faCartShopping} style={{ marginRight: '5px' }} />
              </span>
              ${calculateTotal().toLocaleString()}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
