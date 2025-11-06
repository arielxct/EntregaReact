import "./Cart.css";
import { useCart } from "../../Context/useCarts";

export const Cart = () => {
  const { carrito, addUnit, removeUnit, deleteProduct } = useCart();

  const totalGeneral = (carrito || []).reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);

  return (
    <aside>
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((prod) => (
              <li key={prod.id}>
                <img src={prod.imageUrl} alt={prod.name} width={40} style={{ marginRight: 10, borderRadius: 6 }} />
                {prod.name} - ${prod.price}
                <strong> x{prod.cantidad}</strong>
                <span style={{ marginLeft: 10 }}>Total: ${ (prod.price * prod.cantidad).toFixed(2) }</span>
                <button onClick={() => addUnit(prod.id)}>+</button>
                <button onClick={() => removeUnit(prod.id)}>-</button>
                <button onClick={() => deleteProduct(prod.id)}>Eliminar</button>
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