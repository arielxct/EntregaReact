import { Item } from "../Item/Item";

export const ItemList = ({ lista, onAddToCart }) => (
  <>
    {lista.length ? (
      lista.map((prod) => (
        <Item key={prod.id} {...prod}>
          <button onClick={() => onAddToCart(prod)}>
            Agregar al carrito
          </button>
        </Item>
      ))
    ) : (
      <p>No hay productos</p>
    )}
  </>
);