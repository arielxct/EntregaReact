import './Nav.css';
import { Link } from "react-router-dom";
import { useState } from 'react'; 

export const Nav = ({ carrito }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const totalArticulos = (carrito || []).reduce((acc, prod) => acc + prod.cantidad, 0);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="main-nav">
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'} 
      </button>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Inicio</Link>
        </li>
        <li>
          <Link to="/productos" onClick={closeMenu}>Productos</Link>
        </li>
        <li>
          <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
        </li>
        <li className="cart-item-desktop"> {/* Clase para el carrito en escritorio */}
          <Link to="/cart" onClick={closeMenu} className="cart-link"> {/* Nueva clase 'cart-link' */}
            <span role="img" aria-label="carrito" className="cart-icon">🛒</span>
            <span className="cart-count">{totalArticulos}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};