import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Cart } from "./components/Cart/Cart";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { Nav } from "./components/Nav/Nav";
// 1. IMPORTAR EL COMPONENTE CONTACTOS
import { Contactos } from "./components/Contactos/Contactos"; 


function App() {
  const [carrito, setCarrito] = useState([]);

  const handleAddToCart = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const handleAddUnit = (id) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const handleRemoveUnit = (id) => {
    setCarrito(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const handleDeleteProduct = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  return (
    <BrowserRouter>
      <Header />
      <Nav carrito={carrito} />
      <main className="layout-ecommerce">
        <Routes>
          <Route
            path="/"
            element={
              <ItemListContainer
                onAddToCart={handleAddToCart}
                titulo="Bienvenidos"
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                carrito={carrito}
                onAddUnit={handleAddUnit}
                onRemoveUnit={handleRemoveUnit}
                onDeleteProduct={handleDeleteProduct}
              />
            }
          />
          <Route
            path="/item/:id"
            element={
              <ItemDetailContainer onAddToCart={handleAddToCart} />
            }
          />
          {/* 2. NUEVA RUTA PARA CONTACTOS */}
          <Route path="/contacto" element={<Contactos />} />
          {/* Opcional: Ruta para /productos, si es diferente a la ruta "/" (Inicio) */}
          <Route 
             path="/productos" 
             element={
                 <ItemListContainer 
                     onAddToCart={handleAddToCart} 
                     titulo="Todos los Productos" 
                 />
             } 
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;