import { useState } from "react";
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import { validateProduct } from "../../../utils/validateProducts";
import { uploadToImgbb } from "../../../services/uploadImage";
import { createProduct } from "../../../services/products";
import "./ProductFormContainer.css";

export const ProductFormContainer = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    // no usar ...initialProduct si no está definido
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // pasar file dentro del objeto para validación
    const newErrors = validateProduct({ ...product, file }, !file);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Asegúrate que uploadImage recibe el archivo (file)
      const imageUrl = file ? await uploadToImgbb(file) : product.image || "";
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      await createProduct(productData);
      alert("Producto creado con éxito");

      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      setErrors({ general: error.message || "Error al crear producto" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onFileChange={setFile}
      onSubmit={handleSubmit}
    />
  );
};