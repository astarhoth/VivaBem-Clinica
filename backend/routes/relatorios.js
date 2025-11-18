document.getElementById("btn-gerar").onclick = async () => {
  const data = document.getElementById("data").value;
  const container = document.getElementById("resultado");

  const req = await fetch(`http://localhost:4000/api/report/diario?date=${data}`);
  const dados = await req.json();

  container.innerHTML = `
    <div>Total emitidas: ${dados.total_emitidas}</div>
    <div>Total atendidas: ${dados.total_atendidas}</div>
    <div>Detalhes:</div>
    <pre>${JSON.stringify(dados.detalhe, null, 2)}</pre>
  `;
};
