"use client";

import { FaLock, FaUser, FaEyeSlash, FaRegEye } from "react-icons/fa";
import logo from "@/assets/logoBranca.svg";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use "next/navigation" para navegação no Next.js
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const Login = () => {
    const { login } = useAuth(); // Acessa a função login do contexto
    // ...
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        if (!email || !password) {
            setMessage("Por favor, preencha todos os campos.");
            setIsLoading(false);
            return;
        }

        axios.post("http://localhost:3001/login", { email, password })
            .then((response) => {
                login(response.data); // Salva o usuário no contexto
                setMessage("Login bem-sucedido!");
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/acesso");
                }, 1200);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.error || "Erro ao conectar ao servidor.";
                setMessage(errorMessage);
                setIsLoading(false);
            });
    };
    // ...
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <img
          src={logo}
          alt="Logo do sistema"
          className="logo"
          title="Scapola Comunica"
        />
        <h1>Acesse o sistema</h1>
        <div className="input-field">
          <input
            id="email"
            type="email"
            placeholder=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="placeholder-label">
            E-mail
          </label>
          <FaUser className="icon2" />
        </div>
        <div className="input-field">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="placeholder-label">
            Senha
          </label>
          <span onClick={togglePasswordVisibility} className="icon">
            {showPassword ? (
              <FaRegEye />
            ) : password.length > 0 ? (
              <FaEyeSlash />
            ) : (
              <FaLock />
            )}
          </span>
        </div>
        <div className="recall-forget">
          <a href="#">Esqueceu a senha?</a>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      {message && (
        <div
          className={`notification ${
            message.includes("erro") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
