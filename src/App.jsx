import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Cart } from "./components/Cart/Cart";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { Nav } from "./components/Nav/Nav";
import { Contactos } from "./components/Contactos/Contactos";
import { CartProvider } from "./Context/useCarts";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer/ProductFormContainer";
import { AuthProvider } from "./Context/AuthContext/AuthProvider"; // <-- agregado

import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { RutaProtegida } from "./components/RutaProtegida/RutaProtegida";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <AuthProvider> 
      <CartProvider>
        <HashRouter>
          <Header />
          <Nav />
          <main className="layout-ecommerce">
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<ItemListContainer titulo="Bienvenidos" />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/item/:id" element={<ItemDetailContainer />} />
                <Route path="/contacto" element={<Contactos />} />
                <Route path="/productos" element={<ItemListContainer titulo="Todos los Productos" />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Login />} />
                <Route
                  path="alta-productos"
                  element={
                    <RutaProtegida>
                      <ProductFormContainer />
                    </RutaProtegida>
                  }
                />
              </Route>
            </Routes>
          </main>
          <Footer />
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;