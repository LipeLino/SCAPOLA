import React, { createContext, useState, useContext } from "react";

// Cria o contexto
const AuthContext = createContext();

// Provider que envolverá os componentes do app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado do usuário (null = não logado)

    // Função para realizar login (exemplo)
    const login = (userData) => {
        setUser(userData); // Define o estado do usuário
        localStorage.setItem("user", JSON.stringify(userData)); // Salva no localStorage
    };

    // Função para realizar logout
    const logout = () => {
        setUser(null); // Limpa o estado do usuário
        localStorage.removeItem("user"); // Remove do localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acessar o contexto facilmente
export const useAuth = () => {
    return useContext(AuthContext);
};
