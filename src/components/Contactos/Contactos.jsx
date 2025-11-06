import React, { useState } from 'react';
// import './Contactos.css';//

// ...existing code...
import './Contactos.css';
// ...existing code...

export const Contactos = () => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });
    // Estado para manejar el envío del formulario
    const [mensajeEnviado, setMensajeEnviado] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Aquí iría la lógica real para enviar los datos a un servidor/API
        console.log('Datos enviados:', formData);
        
        // Simular el éxito del envío
        setMensajeEnviado(true);
        
        // Opcional: Limpiar el formulario después del envío
        setFormData({
            nombre: '',
            email: '',
            asunto: '',
            mensaje: ''
        });
        
        // Opcional: Quitar el mensaje de éxito después de unos segundos
        setTimeout(() => setMensajeEnviado(false), 5000);
    };

    return (
        <div className="contact-page-container">
            <h1 className="contact-title">Contáctanos</h1>
            <p className="contact-subtitle">Estamos aquí para ayudarte. Rellena el formulario o usa la información de contacto.</p>

            <div className="contact-content">
                <section className="contact-info">
                    <h2>Información de Contacto</h2>
                    <p>📧 Email: contacto@ecommerce.com</p>
                    <p>📞 Teléfono: +54 9 11 XXXX-XXXX</p>
                    <p>📍 Dirección: Calle React nro 123, CABA, Argentina</p>
                    
                    <h3>Horarios de Atención</h3>
                    <p>Lunes a Viernes: 9:00 - 18:00 hs.</p>
                </section>

                <section className="contact-form-section">
                    <h2>Envíanos un Mensaje</h2>
                    {mensajeEnviado && (
                        <p className="success-message">¡Tu mensaje ha sido enviado con éxito!</p>
                    )}
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="asunto">Asunto</label>
                            <input
                                type="text"
                                id="asunto"
                                name="asunto"
                                value={formData.asunto}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mensaje">Mensaje</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                rows="5"
                                value={formData.mensaje}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">Enviar Mensaje</button>
                    </form>
                </section>
            </div>
        </div>
    );
};