import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
   
    const currentYear = new Date().getFullYear(); 

    return (
        <footer className="main-footer">
            <div className="footer-content">
                
                
                <div className="footer-section about">
                    <h3 className="footer-logo">E-Commerce XYZ</h3>
                    <p>
                        Tu tienda online de confianza. Encuentra los mejores productos con calidad garantizada y excelente servicio.
                    </p>
                    <p className="copyright-text">
                        &copy; {currentYear} E-Commerce XYZ. Todos los derechos reservados.
                    </p>
                </div>

              
                <div className="footer-section links">
                    <h3>Navegación</h3>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/cart">Mi Carrito</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>

               
                <div className="footer-section contact">
                    <h3>Contáctanos</h3>
                    <p><span role="img" aria-label="email">📧</span> Email: info@ecommercexyz.com</p>
                    <p><span role="img" aria-label="telefono">📞</span> Teléfono: +54 11 5555-1234</p>
                    <p><span role="img" aria-label="ubicacion">📍</span> Ubicación: Ciudad Autónoma de Buenos Aires</p>
                </div>

               
                <div className="footer-section social">
                    <h3>Síguenos</h3>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <span role="img" aria-label="facebook">📘</span> Facebook
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <span role="img" aria-label="instagram">📸</span> Instagram
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <span role="img" aria-label="twitter">🐦</span> X (Twitter)
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};