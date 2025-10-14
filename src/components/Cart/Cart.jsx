import "./Cart.css";

export const Cart = ({
  carrito,
  onAddUnit,
  onRemoveUnit,
  onDeleteProduct
}) => {
  const totalGeneral = carrito.reduce(
    (acc, prod) => acc + prod.price * prod.cantidad,
    0
  );

  return (
    <aside>
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((prod, idx) => (
              <li key={idx}>
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  width={40}
                  style={{ marginRight: "10px", borderRadius: "6px" }}
                />
                {prod.name} - ${prod.price}
                <strong> x{prod.cantidad}</strong>
                <span style={{ marginLeft: "10px" }}>
                  Total: ${ (prod.price * prod.cantidad).toFixed(2) }
                </span>
                <button onClick={() => onAddUnit(prod.id)}>+</button>
                <button onClick={() => onRemoveUnit(prod.id)}>-</button>
                <button onClick={() => onDeleteProduct(prod.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total general: ${ totalGeneral.toFixed(2) }</strong>
          </div>
        </>
      )}
    </aside>
  );
};