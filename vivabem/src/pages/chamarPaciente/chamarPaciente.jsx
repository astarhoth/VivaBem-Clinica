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
  const [senhaAtual, setSenhaAtual] = useState(null);

  function getUltimas() {
    const todas = listarTodasSenhas()
      .filter(s => s.chamadoEm)
      .sort((a, b) => b.chamadoEm - a.chamadoEm);

    return todas.slice(0, 5);
  }

  function refresh() {
    const todas = listarTodasSenhas()
      .filter(s => s.chamadoEm)
      .sort((a, b) => b.chamadoEm - a.chamadoEm);

    setUltimasChamadas(todas.slice(0, 5));
    setSenhaAtual(todas[0] || null); // último chamado
    setFila(listarSenhasAtivas());
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="container-chamar">
      <h1>Senha chamada</h1>

      {senhaAtual ? (
        <div className="senha-atual">
          <h2>
            <strong>{senhaAtual.id}</strong> — Tipo: {senhaAtual.tipo} — Guichê:{" "}
            {senhaAtual.guiche}
          </h2>
        </div>
      ) : (
        <h2>Nenhuma senha chamada ainda</h2>
      )}

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
