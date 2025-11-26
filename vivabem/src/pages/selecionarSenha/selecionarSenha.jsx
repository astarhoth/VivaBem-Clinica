import React from "react";
import "./selecionarSenha.css";

export default function SelecionarSenha({ onSelecionar }) {
  return (
    <div className="container">
      <div className="header-tag">Tipo de senha</div>

      <h1 className="title">
        Selecione o seu tipo<br/>de Senha
      </h1>

      <div className="cards">
        <div className="card">
          <div className="circle">SP</div>
          <h3>Senha Prioritária</h3>
          <p>Pessoas com deficiência, gestante, idosos, lactantes.</p>
          <button onClick={() => onSelecionar("prioritaria")}>
            Selecionar
          </button>
        </div>

        <div className="card">
          <div className="circle">SG</div>
          <h3>Senha Geral</h3>
          <p>Público geral, funciona por ordem de chegada.</p>
          <button onClick={() => onSelecionar("geral")}>
            Selecionar
          </button>
        </div>

        <div className="card">
          <div className="circle">SE</div>
          <h3>Senha Exame</h3>
          <p>Pacientes já cadastrados, para exames ou coletas.</p>
          <button onClick={() => onSelecionar("exame")}>
            Selecionar
          </button>
        </div>
      </div>
    </div>
  );
}