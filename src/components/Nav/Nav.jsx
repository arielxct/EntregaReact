import './Nav.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

export const Nav = ({ carrito }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const totalArticulos = (carrito || []).reduce((acc, prod) => acc + prod.cantidad, 0);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="main-nav">
      
      {/* Botón Hamburguesa (Sigue siendo visible solo en móvil) */}
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'} 
      </button>

      {/* ÍCONO DE CARRITO FLOTANTE EN MÓVIL (AQUÍ ES DONDE SE VE SOLO EL ÍCONO) */}
      <Link to="/cart" className="mobile-cart-icon-link-solo"> {/* Nueva clase para evitar conflictos */}
        <span role="img" aria-label="carrito" className="cart-icon">🛒</span>
        <span className="cart-count">{totalArticulos}</span>
      </Link>
      
      {/* Menú de Navegación (visible en escritorio, overlay en móvil) */}
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Inicio</Link>
        </li>
        <li>
          <Link to="/productos" onClick={closeMenu}>Productos</Link>
        </li>
        <li>
          {/* ITEM DE CARRITO DE ESCRITORIO CON TEXTO Y CONTADOR */}
          <li className="nav-item-cart"> 
              <Link to="/cart" onClick={closeMenu} className="cart-link">
                  <span role="img" aria-label="carrito" className="cart-icon">🛒</span>
                  Carrito 
                  <span className="cart-count">{totalArticulos}</span>
              </Link>
          </li>
          
        </li>
        <li>
          <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
        </li>
      </ul>
    </nav>
  );
};