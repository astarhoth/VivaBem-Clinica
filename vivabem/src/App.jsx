import React, { useState } from "react"; // 👈 adicionado useState
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home.jsx';
import Header from './components/Header.jsx';
import './components/Header.css';
import SelecionarSenha from "./pages/selecionarSenha/selecionarSenha.jsx";
import ChamarPaciente from './pages/chamarPaciente/chamarPaciente.jsx';
import SenhaRecepcionista from "./pages/senhaRecepcionista/senhaRecepcionista.jsx";


// --- GERADOR DE SENHAS ---
const contadores = {
  SP: 0,
  SG: 0,
  SE: 0
};


function gerarSenha(tipoEscolhido) {
  const hoje = new Date();


  const YY = String(hoje.getFullYear()).slice(-2);
  const MM = String(hoje.getMonth() + 1).padStart(2, "0");
  const DD = String(hoje.getDate()).padStart(2, "0");


  const tipoParaPP = {
    prioritaria: "SP",
    geral: "SG",
    exame: "SE"
  };


  const PP = tipoParaPP[tipoEscolhido];


  // aumenta o contador do tipo
  contadores[PP] += 1;


  const SQ = String(contadores[PP]).padStart(2, "0");


  return `${YY}${MM}${DD}-${PP}${SQ}`;
}


export default function App() {
  // state para guardar a última senha gerada
  const [senhaGerada, setSenhaGerada] = useState("");


  const handleSelecionar = (tipo) => {
    const senha = gerarSenha(tipo);
    console.log("Senha gerada:", senha);
    setSenhaGerada(senha); // salva a senha para mostrar na telinha
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
          element={
            <SelecionarSenha
              onSelecionar={handleSelecionar}
              senhaGerada={senhaGerada}
              setSenhaGerada={setSenhaGerada}
            />
          }
        />


        {/* Página Chamar Paciente */}
        <Route path="/chamar-paciente" element={<ChamarPaciente />} />


        {/* Rota Senha Recepcionista*/}
        <Route path="/senha-recepcionista" element={<SenhaRecepcionista />} />
      </Routes>
    </BrowserRouter>
  );
}
