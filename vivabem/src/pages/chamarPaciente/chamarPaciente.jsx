import React, { useState, useEffect } from "react";
import {
  listarSenhasAtivas,
  chamarProximaSenha,
  listarTodasSenhas
} from "../../utils/filaSenhas";
import "./chamarPaciente.css";

export default function ChamarPaciente() {
  const [ultimasChamadas, setUltimasChamadas] = useState([]);
  const [fila, setFila] = useState([]);

  function getUltimas() {
    const todas = listarTodasSenhas()
      .filter(s => s.chamadoEm)
      .sort((a, b) => b.chamadoEm - a.chamadoEm);

    return todas.slice(0, 5);
  }

  function refresh() {
    setFila(listarSenhasAtivas());
    setUltimasChamadas(getUltimas());
  }

  useEffect(() => {
    refresh();
  }, []);

  function chamar() {
    const chamado = chamarProximaSenha();

    // 1) NENHUMA SENHA DISPONÍVEL
    if (!chamado) {
      alert("Nenhuma senha disponível para chamar.");
      return;
    }

    // 2) TEM SENHA, MAS NÃO TEM GUICHÊ DISPONÍVEL
    if (chamado.error) {
      alert(chamado.message);
      return;
    }

    // 3) SUCESSO — SENHA CHAMADA
    refresh();
  }

  return (
    <div className="container-chamar">
      <h1>Painel da Atendente</h1>

      <button onClick={chamar} className="btn-chamar">
        Chamar Próxima Senha
      </button>

      <h3>Últimas 5 chamadas</h3>
      <ol>
        {ultimasChamadas.map(s => (
          <li key={s.id}>
            <strong>{s.id}</strong> — Tipo: {s.tipo} — Guichê: {s.guiche} — Hora:{" "}
            {new Date(s.chamadoEm).toLocaleTimeString()}
          </li>
        ))}
      </ol>
    </div>
  );
}
