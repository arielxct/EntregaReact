// ...existing code...
import { Item } from "../Item/Item";
import { useCart } from "../../Context/useCarts";

export const ItemList = ({ lista, onAddToCart }) => {
  // intenta usar la función pasada por props, si no está, intenta obtenerla del contexto
  let addFn = onAddToCart;
  try {
    const ctx = useCart();
    addFn = addFn ?? ctx.addToCart;
  } catch (e) {
    addFn = addFn ?? undefined;
  }

  return (
    <>
      {Array.isArray(lista) && lista.length ? (
        lista.map((prod) => (
          <Item key={prod.id} {...prod}>
            <button
              type="button"
              onClick={() => addFn ? addFn(prod) : undefined}
              aria-label={`Agregar ${prod.name} al carrito`}
              disabled={!addFn}
            >
              Agregar al carrito
            </button>
          </Item>
        ))
      ) : (
        <p>No hay productos</p>
      )}
    </>
  );
};
// ...existing code...