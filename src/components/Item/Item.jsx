
import "./Item.css";
import { Link } from "react-router-dom";

export const Item = ({ id, name, price, description, imageUrl, children }) => (
  <article className="product-item">
    <img src={imageUrl} alt={description} />
    <h2 className="product-title">{name}</h2>

    {/* NUEVA ENVOLTURA PARA DETALLES */}
    <div className="product-details"> 
        <p>Precio: ${price}</p>
        <p>Descripción: {description}</p>
    </div>
    {/* FIN DE LA ENVOLTURA */}

    <Link to={`/item/${id}`}>Ver detalle</Link>
    {children}
  </article>
);
