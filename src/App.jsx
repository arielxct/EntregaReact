import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Cart } from "./components/Cart/Cart";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { Nav } from "./components/Nav/Nav";
import { Contactos } from "./components/Contactos/Contactos";
import { CartProvider } from "./Context/useCarts";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer/ProductFormContainer"; // <-- IMPORT agregado

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Header />
        <Nav />
        <main className="layout-ecommerce">
          <Routes>
            <Route path="/" element={<ItemListContainer titulo="Bienvenidos" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/contacto" element={<Contactos />} />
            <Route path="/productos" element={<ItemListContainer titulo="Todos los Productos" />} />
            <Route path="/admin" element={<ProductFormContainer/>} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </CartProvider>
  );
}

export default App;