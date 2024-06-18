import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const PizzaGallery = ({ pizza }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: "RemovePizza", payload: pizza });
  };

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={pizza.img} />
      <Card.Body>
        <Card.Title>{pizza.name}</Card.Title>
        <Card.Text>{pizza.desc}</Card.Text>
        <Button variant="primary" as={Link} to={`/pizza/${pizza.id}`}>
          View Details
        </Button>
        <Button variant="success" onClick={addToCart} className="ml-2">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PizzaGallery;
