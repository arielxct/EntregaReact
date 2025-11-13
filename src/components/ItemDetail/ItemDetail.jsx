
import { Item } from "../Item/Item";

export const ItemDetail = ({ detail = {}, onAddToCart = () => {}, onClose = () => {} }) => {
  if (!detail || Object.keys(detail).length === 0) {
    return <section className="item-detail"><p> Producto no disponible </p></section>;
  }

  return (
    <section className="item-detail">
      <Item {...detail} className="detalle-item">
        <div className="detail-actions">
          <button
            type="button"
            onClick={() => onAddToCart(detail)}
            aria-label={`Agregar ${detail.name || "producto"} al carrito`}
            className="btn btn-primary"
          >
            Enviar al carrito
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista de detalle"
            className="btn btn-secondary"
            style={{ marginLeft: "10px" }}
          >
            Cerrar
          </button>
        </div>
      </Item>

      <div className="item-detail-extra" style={{ marginTop: "1rem", color: "#ccc" }}>
        <p><strong>Detalles extra:</strong></p>
        <p>{detail.longDescription || detail.description || "Sin detalles adicionales."}</p>
        {detail.specs && (
          <ul className="detail-specs">
            {Object.entries(detail.specs).map(([k, v]) => (
              <li key={k}><strong>{k}:</strong> {String(v)}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
