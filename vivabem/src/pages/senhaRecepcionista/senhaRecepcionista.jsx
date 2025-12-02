// vivabem/src/pages/senhaRecepcionista/senhaRecepcionista.jsx
import React, { useState, useEffect } from "react";
import { listarSenhasAtivas, listarTodasSenhas, gerarSenha, initGuiches,chamarProximaSenha} from "../../utils/filaSenhas";
import "./senhaRecepcionista.css";

export default function SenhaRecepcionista(){
  const [filaAtiva, setFilaAtiva] = useState([]);
  const [todas, setTodas] = useState([]);

  useEffect(()=>{
    initGuiches(3); // inicializa 3 guichês por padrão (ajuste se quiser)
    refresh();
  },[]);

  function refresh(){
    setFilaAtiva(listarSenhasAtivas());
    setTodas(listarTodasSenhas());
  }

  function emitir(tipo){
    gerarSenha(tipo);
    refresh();
  }
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
    <div className="container-recepcao">
      <h1>Painel da Recepcionista</h1>
      <button onClick={chamar} className="btn-chamar">
        Chamar Próxima Senha
      </button>
      <h3>Senhas na fila (ativas)</h3>
      <ul>
        {filaAtiva.map(s => (
          <li key={s.id}>{s.id} — {s.tipo} — Criada: {new Date(s.criadoEm).toLocaleTimeString()}</li>
        ))}
      </ul>

      <h3>Histórico (todas)</h3>
      <div style={{maxHeight:200, overflow:"auto"}}>
        <table>
          <thead><tr><th>Id</th><th>Tipo</th><th>Chamado</th><th>Guichê</th></tr></thead>
          <tbody>
            {todas.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.tipo}</td>
                <td>{s.chamadoEm ? new Date(s.chamadoEm).toLocaleTimeString() : ""}</td>
                <td>{s.guiche || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
