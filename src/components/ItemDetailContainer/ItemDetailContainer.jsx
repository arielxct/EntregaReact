import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";

export const ItemDetailContainer = ({ onAddToCart }) => {
  const [detail, setDetail] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se encontro el producto");
        }
        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => String(p.id) === id);
        if (found) {
          setDetail(found);
        } else {
          throw new Error("Producto no encontrado");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <main>
      {Object.keys(detail).length ? (
        <ItemDetail detail={detail} onAddToCart={onAddToCart} onClose={() => navigate(-1)} />
      ) : (
        <p>Cargando...</p>
      )}
    </main>
  );
};