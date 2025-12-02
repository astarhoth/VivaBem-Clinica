import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home.jsx';
import Header from './components/Header.jsx';
import './components/Header.css';
import SelecionarSenha from "./pages/selecionarSenha/selecionarSenha.jsx";
import ChamarPaciente from './pages/chamarPaciente/chamarPaciente.jsx';
import SenhaRecepcionista from "./pages/senhaRecepcionista/senhaRecepcionista.jsx";

// importa o sistema real
import { initGuiches, gerarSenha } from "./utils/filaSenhas";

export default function App() {
  const [senhaGerada, setSenhaGerada] = useState("");

  // inicializa guichês ao abrir o sistema
  useEffect(() => {
    initGuiches(3);
  }, []);

  const handleSelecionar = (tipo) => {
    const senhaObj = gerarSenha(tipo); // usa sistema completo
    console.log("Senha gerada:", senhaObj);
    setSenhaGerada(senhaObj.id); // mostra só o ID na tela
  };

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/selecionar-senha"
          element={
            <SelecionarSenha
              onSelecionar={handleSelecionar}
              senhaGerada={senhaGerada}
              setSenhaGerada={setSenhaGerada}
            />
          }
        />

        <Route path="/chamar-paciente" element={<ChamarPaciente />} />

        <Route path="/senha-recepcionista" element={<SenhaRecepcionista />} />
      </Routes>
    </BrowserRouter>
  );
}
