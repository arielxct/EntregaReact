import {useState} from "react";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext";
import {Navigate, useNavigate} from "react-router-dom";
import './Login.css';

export const Login = () => {
    const [userForm, setUserForm] = useState({name:"", password:""});
    const { user, login } = useAuthContext(); // <-- obtener user también
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({...userForm, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(userForm.name, userForm.password);
        if (success) {
            alert("Inicio de sesión exitoso.");
            navigate("/admin/alta-productos");
        } else {
            alert("Credenciales incorrectas.");
            setUserForm({name:"", password:""});
        }
    };

    if (user) {
        return <Navigate to="/admin/alta-productos"  />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <div>
                <label>Usuario:</label>
                <input type="text" name="name" value={userForm.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" name="password" value={userForm.password} onChange={handleChange} required />
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};
