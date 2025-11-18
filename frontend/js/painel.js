// puxa as últimas senhas do backend
async function carregarPainel() {
  const lista = document.getElementById("lista-senhas");

  lista.innerHTML = "";

  const req = await fetch("http://localhost:4000/api/senha/ultimas");
  const dados = await req.json();

  dados.forEach((item) => {
    const div = document.createElement("div");
    div.className = "card-senha";
    div.textContent = `${item.codigo} — ${item.guiche}`;
    lista.appendChild(div);
  });
}

setInterval(carregarPainel, 2000);
carregarPainel();
