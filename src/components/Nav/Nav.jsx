import './Nav.css'
import { Link } from "react-router-dom";

export const Nav = ({ carrito }) => {
  // Si carrito es undefined, usa un array vacío
  const totalArticulos = (carrito || []).reduce((acc, prod) => acc + prod.cantidad, 0);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/">Productos</Link>
        </li>
        <li>
          <Link to="/cart">
            <span role="img" aria-label="carrito">🛒</span>
            <span className="cart-count">{totalArticulos}</span>
            Carrito
          </Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
};