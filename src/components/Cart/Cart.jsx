import { useState } from "react";
import "./Cart.css";
import { useCart } from "../../Context/useCarts";

const simulatePayment = (paymentData) =>
  new Promise((resolve, reject) => {
   
    setTimeout(() => {
      const ok = Math.random() > 0.08; // 92% éxito
      if (ok) resolve({ orderId: `ORD-${Date.now()}` });
      else reject(new Error("Pago rechazado por el emisor"));
    }, 1600);
  });

export const Cart = () => {
  const { carrito, addUnit, removeUnit, deleteProduct, clearCart } = useCart();

  const [payOpen, setPayOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [success, setSuccess] = useState(null);
  const [payment, setPayment] = useState({
    nombre: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const totalGeneral = (carrito || []).reduce(
    (acc, prod) => acc + prod.price * prod.cantidad,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((p) => ({ ...p, [name]: value }));
  };

  const startCheckout = () => {
    setPaymentError("");
    setPayOpen(true);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setPaymentError("");
  
    if (!payment.nombre.trim() || payment.cardNumber.trim().length < 12) {
      setPaymentError("Complete los datos de pago correctamente.");
      return;
    }
    setProcessing(true);
    try {
      const result = await simulatePayment(payment);
      setSuccess(result);
    
      clearCart();
      setPayOpen(false);
      setPayment({ nombre: "", cardNumber: "", expiry: "", cvv: "" });
    } catch (err) {
      setPaymentError(err.message || "Error en el pago");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <aside className="cart-wrapper">
      <h2>Carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul className="cart-list">
            {carrito.map((prod) => (
              <li key={prod.id} className="cart-item">
                <img
                  src={prod.imageUrl || prod.image || ""}
                  alt={prod.name}
                  width={56}
                  style={{ marginRight: 10, borderRadius: 6 }}
                />
                <div className="cart-meta">
                  <div className="cart-name">{prod.name}</div>
                  <div className="cart-price">
                    ${prod.price} <strong> x{prod.cantidad}</strong>
                    <span className="line-total">
                      Total: ${ (prod.price * prod.cantidad).toFixed(2) }
                    </span>
                  </div>
                </div>

                <div className="cart-actions">
                  <button onClick={() => addUnit(prod.id)} disabled={processing}>+</button>
                  <button onClick={() => removeUnit(prod.id)} disabled={processing}>-</button>
                  <button onClick={() => deleteProduct(prod.id)} disabled={processing}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <strong>Total general: ${totalGeneral.toFixed(2)}</strong>
            <div className="cart-controls">
              <button onClick={startCheckout} disabled={processing}>Pagar</button>
              <button onClick={() => clearCart()} disabled={processing}>Vaciar carrito</button>
            </div>
          </div>
        </>
      )}

      {/* Pago / checkout */}
      {payOpen && (
        <section className="checkout-section">
          <h3>Formulario de pago</h3>
          {paymentError && <p className="payment-error">{paymentError}</p>}
          <form onSubmit={handlePay} className="payment-form">
            <label>
              Nombre en la tarjeta
              <input name="nombre" value={payment.nombre} onChange={handleChange} disabled={processing} />
            </label>
            <label>
              Número de tarjeta
              <input name="cardNumber" value={payment.cardNumber} onChange={handleChange} disabled={processing} />
            </label>
            <label>
              Expiración (MM/AA)
              <input name="expiry" value={payment.expiry} onChange={handleChange} disabled={processing} />
            </label>
            <label>
              CVV
              <input name="cvv" value={payment.cvv} onChange={handleChange} disabled={processing} />
            </label>

            <div style={{ marginTop: 10 }}>
              <button type="submit" disabled={processing}>
                {processing ? "Procesando..." : `Pagar $${totalGeneral.toFixed(2)}`}
              </button>
              <button type="button" onClick={() => setPayOpen(false)} disabled={processing} style={{ marginLeft: 8 }}>
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Confirmación de orden */}
      {success && (
        <div className="order-confirmation">
          <h3>Pago exitoso</h3>
          <p>Tu orden fue procesada correctamente.</p>
          <p><strong>ID de orden:</strong> {success.orderId}</p>
        </div>
      )}
    </aside>
  );
};