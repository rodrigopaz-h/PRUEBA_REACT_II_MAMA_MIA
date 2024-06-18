import { Route, Routes } from "react-router-dom";
import { NotFound } from "./views/NotFound";
import NavigationBar from "./Components/NavigationBar";
import Home from "./views/Home";
import Carrito from "./views/Carrito";
import PizzaHome from "./views/PizzaHome";

const App = () => {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pizza/:id" element={<PizzaHome />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default App;
