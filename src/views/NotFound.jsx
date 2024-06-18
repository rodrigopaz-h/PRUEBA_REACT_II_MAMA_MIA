import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4"><strong>Error 404</strong> 😭</h1>
      <h3>La ruta que estás intentando abrir no existe.
        <br /> !Revisa la dirección! 👀</h3>
        <Link to="/">Volver al inicio 🍕</Link>
    </Container>
  );
};