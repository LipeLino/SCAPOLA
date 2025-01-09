import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Acessa o contexto de autenticação

const PrivateRoute = ({ children }) => {
    const { user } = useAuth(); // Verifica se há um usuário autenticado
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
