// ...existing code...
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useCart } from "../../Context/useCarts";

export const ItemDetailContainer = ({ onAddToCart }) => {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // obtener addToCart desde contexto si no viene por props
  let addToCartCtx;
  try {
    const ctx = useCart();
    addToCartCtx = ctx?.addToCart;
  } catch (e) {
    addToCartCtx = undefined;
  }
  const handleAddToCart = onAddToCart ?? addToCartCtx ?? (() => {});

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetch("/data/products.json", { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error("No se encontró el producto");
        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        if (found) {
          setDetail(found);
        } else {
          setDetail({});
          setError("Producto no encontrado");
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message || "Error al cargar el producto");
        }
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [id]);

  return (
    <main>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : Object.keys(detail).length ? (
        <ItemDetail
          detail={detail}
          onAddToCart={(p) => handleAddToCart(p)}
          onClose={() => navigate(-1)}
        />
      ) : (
        <p>Producto no disponible</p>
      )}
    </main>
  );
};
// ...existing code...