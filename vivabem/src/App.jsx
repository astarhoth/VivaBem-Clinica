import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home.jsx';
import Header from './components/Header.jsx';
import './components/Header.css';
import SelecionarSenha from "./pages/selecionarSenha.jsx";

export default function App() {

  const handleSelecionar = (tipo) => {
    console.log("Tipo selecionado:", tipo);
  };

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Página de Seleção de Senha */}
        <Route
          path="/selecionar-senha"
          element={<SelecionarSenha onSelecionar={handleSelecionar} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
