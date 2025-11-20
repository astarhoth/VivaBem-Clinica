import React from 'react';
import './ChamarPaciente.css'; // Importa o CSS renomeado


export default function ChamarPaciente() {
  return (
    <div className="chamar-paciente-container">
      <main className="chamar-paciente-content">
        
        {/*senha atual */}
        <div className="left-column">
          <h1 className="section-title">Senha</h1>
          <div className="underline"></div>
          
          <div className="ticket-card">
            {/* texto do código da senha */}
            <span className="ticket-code"></span>
          </div>
        </div>

        {/* já chamadas */}
        <div className="right-column">
          <div className="history-card">
            <h2 className="history-title">Já Chamadas</h2>
            <div className="history-underline"></div>
            
            {/* lista de senhas anteriores */}
            <div className="history-list">
               {/* Exemplo de itens vazios ou preenchidos */}
               <div className="history-item-placeholder"></div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}