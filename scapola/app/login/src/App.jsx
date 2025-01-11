import './App.css';
import Acesso from './Components/acesso/page';
import Login from './Components/login/page';
import PrivateRoute from './Components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {/* Rota para o login de admin */}
                        <Route path="/admin" element={<Login />} /> 

                        {/* Rota protegida para acesso autenticado */}
                        <Route
                            path="/acesso"
                            element={
                                <PrivateRoute>
                                    <Acesso />
                                </PrivateRoute>
                            }
                        />

                        {/* Redirecionamento para evitar acessar rotas não existentes */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
