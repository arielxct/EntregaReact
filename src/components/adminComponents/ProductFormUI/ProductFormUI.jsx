import React from "react";

export const ProductFormUI = ({
  product = {},
  errors = {},
  loading = false,
  onChange = () => {},
  onFileChange = () => {},
  onSubmit = (e) => e.preventDefault(),
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>Agregar producto</h2>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name || ""}
            onChange={onChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price ?? ""}
            onChange={onChange}
            required
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={product.category || ""}
            onChange={onChange}
            required
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description || ""}
            onChange={onChange}
            required
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div>
          <label>Imagen:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            required
          />
          {errors.file && <span className="error">{errors.file}</span>}
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Agregar Producto"}
        </button>
      </form>
    </section>
  );
};