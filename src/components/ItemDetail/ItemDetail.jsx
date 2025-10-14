import { Item } from "../Item/Item";

export const ItemDetail = ({ detail, onAddToCart, onClose }) => {
  return (
    <section className="item-detail">
      <Item {...detail} className="detalle-item">
        <button onClick={() => onAddToCart(detail)}>
          Enviar al carrito
        </button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>
          Cerrar
        </button>
      </Item>
      <div style={{ marginTop: "1rem", color: "#ccc" }}>
        <p><strong>Detalles extra:</strong></p>
        <p>{detail.longDescription || "Sin detalles adicionales."}</p>
      </div>
    </section>
  );
};