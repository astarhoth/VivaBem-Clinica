import React, { useState } from "react";
import "./senhaRecepcionista.css"; 

export default function SenhaRecepcionista() {
  // senhas fake
  const [senhaAtual, setSenhaAtual] = useState({ codigo: 'N005', tipo: 'NORMAL' });
  const [fila, setFila] = useState([
    { codigo: 'P002', tipo: 'Preferencial', status: 'Aguardando' },
    { codigo: 'N006', tipo: 'Normal', status: 'Aguardando' },
    { codigo: 'N007', tipo: 'Normal', status: 'Aguardando' },
    { codigo: 'N008', tipo: 'Normal', status: 'Aguardando' },
  ]); // ta funcionando so pra mostar a estrutura

  const chamarProximo = () => {
    if (fila.length > 0) {
      const proximo = fila[0];
      setSenhaAtual({ codigo: proximo.codigo, tipo: proximo.tipo.toUpperCase() });
      setFila(fila.slice(1));
    } else {
      alert("Fila vazia!");
    }
  };

  return (
    <div className="chamar-paciente-container">
      
      <h1 className="page-heading">CHAMAR PACIENTE</h1>

      <main className="chamar-paciente-content">
        
        {/* charmar */}
        <div className="left-column">
          <div className="action-card">
            <h2 className="card-title">Em Atendimento</h2>
            
            {/* senha em atendimento */}
            <div className="ticket-display-box">
              <span className="ticket-type">{senhaAtual.tipo}</span>
              <span className="ticket-code">{senhaAtual.codigo}</span>
            </div>

            {/* botões */}
            <div className="button-group">
                <button className="btn-primary" onClick={chamarProximo}>
                    Chamar Próximo
                </button>
                <button className="btn-secondary">
                    Chamar Novamente
                </button>
            </div>
          </div>
        </div>

        {/* fila */}
        <div className="right-column">
          <div className="queue-card">
            <h2 className="card-title">Próximos da Fila</h2>
            
            <div className="queue-list">
               {fila.map((item, index) => (
                   <div key={index} className="queue-item">
                       <span className="q-code">{item.codigo}</span>
                       <span className="q-type">{item.tipo}</span>
                       <span className="q-status">{item.status}</span>
                   </div>
               ))}
               {fila.length === 0 && <p className="empty-msg">Fila vazia</p>}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}