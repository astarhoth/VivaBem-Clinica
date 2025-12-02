// vivabem/src/pages/selecionarSenha/selecionarSenha.jsx
import React, { useState } from "react";
import { gerarSenha } from "../../utils/filaSenhas";
import "./selecionarSenha.css";

export default function SelecionarSenha() {
  const [ultima, setUltima] = useState(null);

  function emitir(tipo) {
    const s = gerarSenha(tipo);
    setUltima(s);
    alert(`Senha ${s.id} gerada! Validade até ${new Date(s.expiry).toLocaleTimeString()}`);
  }

  return (
    <div className="container-selecionar">
      <h1>Emissão de Senha</h1>
      <div className="botoes">
        <button onClick={() => emitir("SP")}>Emitir SP (Prioritária)</button>
        <button onClick={() => emitir("SE")}>Emitir SE (Retirada de Exames)</button>
        <button onClick={() => emitir("SG")}>Emitir SG (Geral)</button>
      </div>
      {ultima && (
        <div className="info">
          <h2>Senha emitida</h2>
          <p><strong>{ultima.id}</strong></p>
          <p>Tipo: {ultima.tipo}</p>
          <p>Validade: {new Date(ultima.expiry).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
