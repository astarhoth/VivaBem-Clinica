async function atualizarFila() {
  const fila = document.getElementById("fila-info");
  const req = await fetch("http://localhost:4000/api/senha/filas");
  const dados = await req.json();

  fila.innerHTML = `SP: ${dados.sp} — SG: ${dados.sg} — SE: ${dados.se}`;
}

async function chamarSenha() {
  const req = await fetch("http://localhost:4000/api/senha/chamar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guiche: "Guichê 1" }),
  });

  const dados = await req.json();
  alert(dados.message || `Senha chamada: ${dados.senha.codigo}`);
  atualizarUltimas();
}

async function atualizarUltimas() {
  const div = document.getElementById("ultimas-chamadas");
  div.innerHTML = "";

  const req = await fetch("http://localhost:4000/api/senha/ultimas");
  const dados = await req.json();

  dados.forEach((l) => {
    const item = document.createElement("div");
    item.textContent = `${l.codigo} — ${l.guiche}`;
    div.appendChild(item);
  });
}

document.getElementById("btn-chamar").onclick = chamarSenha;

setInterval(() => {
  atualizarFila();
  atualizarUltimas();
}, 2000);

atualizarFila();
atualizarUltimas();
