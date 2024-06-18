import React from "react";
import { Container, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import pizzas from "../data/pizzas.json";
import { Link } from "react-router-dom";
import CoverTitle from "../Components/CoverTitle";
import { useCart } from "../context/ProductsContext";
import { capitalize } from "../utils/capitalize";

const Home = () => {
  const { Cart, dispatch } = useCart();

  const addToCart = (pizza) => {
    dispatch({ type: "AddPizza", payload: pizza });
  };

  const removeFromCart = (pizzaId) => {
    dispatch({ type: "RemovePizza", payload: pizzaId });
  };

  const getCartCount = (pizzaId) => {
    const count = Cart.reduce((total, item) => {
      return item.id === pizzaId ? total + item.quantity : total;
    }, 0);
    return count;
  };

  return (
    <>
      <CoverTitle />
      <Container>
        <Row>
          {pizzas.map((pizza) => (
            <Col xs={12} sm={6} md={4} lg={3} key={pizza.id} className="d-flex align-items-stretch">
              <Card className="mb-4 pizza-card">
                <Card.Img variant="top" src={pizza.img} className="pizza-card-img" />
                <Card.Body>
                  <Card.Title>{capitalize(pizza.name)}</Card.Title>
                  <hr />
                  <div>
                    <strong>Ingredientes:</strong>
                    <ul className="ingredient-list">
                      {pizza.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          <span role="img" aria-label="pizza" className="ingredient-icon">
                            🍕
                          </span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <Card.Text className="price">
                    <strong>${pizza.price.toLocaleString()}</strong>
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <Button
                      variant="info"
                      className="text-white btn-sm"
                      as={Link}
                      to={`/pizza/${pizza.id}`}
                    >
                      Ver Más
                      <span role="img" aria-label="pizza">
                        👀
                      </span>
                    </Button>
                    {getCartCount(pizza.id) > 0 ? (
                      <ButtonGroup className="align-items-center btn-group-sm">
                        <Button variant="danger" className="btn-sm" onClick={() => removeFromCart(pizza.id)}>
                          -
                        </Button>
                        <span className="cart-count">{getCartCount(pizza.id)}</span>
                        <Button variant="primary" className="btn-sm"onClick={() => addToCart(pizza)}>
                          +
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <Button variant="danger" className="btn-sm" onClick={() => addToCart(pizza)}>
                        Añadir
                        <span role="img" aria-label="shopping cart">
                          🛒
                        </span>
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
