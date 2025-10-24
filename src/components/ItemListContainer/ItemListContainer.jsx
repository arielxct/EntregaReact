// ...existing code...
import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import "./ItemListContainer.css";
import { useCart } from "../../Context/useCarts";

export const ItemListContainer = ({ titulo, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Intentar obtener addToCart desde el contexto si no se pasa por props
  let addToCartCtx;
  try {
    const ctx = useCart();
    addToCartCtx = ctx?.addToCart;
  } catch (e) {
    addToCartCtx = undefined; // no hay provider
  }
  const handleAddToCart = onAddToCart ?? addToCartCtx ?? (() => {});

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetch("/data/products.json", { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Hubo un problema al buscar productos");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || "Error al cargar productos");
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, []);

  return (
    <section className="item-list-section">
      <h1>{titulo}</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="item-list-grid">
          <ItemList lista={products} onAddToCart={handleAddToCart} />
        </div>
      )}
    </section>
  );
};