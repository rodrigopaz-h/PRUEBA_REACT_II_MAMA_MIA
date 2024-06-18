import React, { useState } from "react";
import { Container, Row, Col, Button, ListGroup, Image, Alert } from "react-bootstrap";
import { useCart } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const {Cart, dispatch, calculateTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addToCart = (pizza) => {
    dispatch({ type: "AddPizza", payload: pizza });
  };

  const removeFromCart = (pizzaId) => {
    dispatch({ type: "RemovePizza", payload: pizzaId });
  };

  const getCartCount = (pizzaId) => {
    return Cart.filter((item) => item.id === pizzaId).length;
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch({ type: "CleanCart" });
      navigate("/");
    }, 2000);
  };

  const groupedCart = Cart.reduce((acc, pizza) => {
    if (!acc[pizza.id]) {
      acc[pizza.id] = { ...pizza, quantity: 0 };
    }
    acc[pizza.id].quantity += 1;
    return acc;
  }, {});

  const uniqueCartItems = Object.values(groupedCart);

  return (
    <Container className="my-4">
      <h2>Detalles del pedido:</h2>
      {Cart.length === 0 ? (
        <Alert variant="info">Tu carrito está vacío. Agrega tus pizzas y vuelve a ver tu pedido.</Alert>
      ) : (
        <>
          <ListGroup variant="flush">
            {uniqueCartItems.map((pizza, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <Image src={pizza.img} alt={pizza.name} width={50} rounded className="me-3" />
                  <div>{pizza.name}</div>
                </div>
                <div>
                  <span className="text-success me-3">
                    ${(pizza.price * pizza.quantity).toLocaleString()}
                  </span>
                  <Button variant="danger" size="sm" onClick={() => removeFromCart(pizza.id)}>
                    -
                  </Button>
                  <span className="cart-count mx-2">{pizza.quantity}</span>
                  <Button variant="primary" size="sm" onClick={() => addToCart(pizza)}>
                    +
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h3 className="mt-3">Total: ${calculateTotal().toLocaleString()}</h3>
          <Button variant="success" onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? "redirigiendo" : "Ir a Pagar"}
          </Button>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
