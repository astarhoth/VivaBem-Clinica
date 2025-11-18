import React from "react";
import SelecionarSenha from "./pages/SelecionarSenha/selecionarSenha";

function App() {
  const handleSelecionar = (tipo) => {
    console.log("Tipo selecionado:", tipo);

    // aqui você faz:
    // gerar senha
    // mudar de etapa
    // abrir modal
    // enviar pro backend
    // etc
  };

  return (
    <SelecionarSenha onSelecionar={handleSelecionar} />
  );
}

export default App;