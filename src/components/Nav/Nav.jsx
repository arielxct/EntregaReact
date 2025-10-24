import './Nav.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useCart } from "../../Context/useCarts";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { carrito } = useCart(); // consumir contexto
  const totalArticulos = (carrito || []).reduce((acc, prod) => acc + (prod.cantidad || 0), 0);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="main-nav">
      <div className="nav-inner">
        <button
          className="menu-toggle"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <Link to="/cart" className="mobile-cart-icon-link-solo" onClick={closeMenu}>
          <span role="img" aria-label="carrito" className="cart-icon">🛒</span>
          <span className="cart-count">{totalArticulos}</span>
        </Link>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu}>Inicio</Link>
          </li>
          <li>
            <Link to="/productos" onClick={closeMenu}>Productos</Link>
          </li>
          <li className="nav-item-cart">
            <Link to="/cart" onClick={closeMenu} className="cart-link">
              <span role="img" aria-label="carrito" className="cart-icon">🛒</span>
              <span className="cart-text">Carrito</span>
              <span className="cart-count">{totalArticulos}</span>
            </Link>
          </li>
          <li>
            <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};