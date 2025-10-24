import "./Item.css";
import { Link } from "react-router-dom";

export const Item = ({ id, name, price, description, imageUrl, children, className = "" }) => (
  <article className={`product-item ${className}`}>
    <img src={imageUrl} alt={description || name} />
    <h2 className="product-title">{name}</h2>

    <div className="product-details">
      <p className="product-price">Precio: ${price}</p>
      <p className="product-desc">{description}</p>
    </div>

    <Link to={`/item/${id}`} className="detail-link">Ver detalle</Link>
    {children}
  </article>
);