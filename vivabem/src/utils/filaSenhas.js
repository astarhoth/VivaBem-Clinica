// vivabem/src/utils/filaSenhas.js
// Versão completa com controle REAL de guichês, TM e liberação automática
// OPÇÃO A → Primeiro guichê livre

const STORAGE_KEY = "viva_senhas_v1";
const GUICHES_KEY = "viva_guiches_v1";
const META_KEY = "viva_meta_v1";

// ------------------------
// Utilidades básicas
// ------------------------
function _read() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { senhas: [], seq: { SP: 0, SG: 0, SE: 0 } };
  try { return JSON.parse(raw); } catch { 
    return { senhas: [], seq: { SP: 0, SG: 0, SE: 0 } };
  }
}
function _write(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

function _readGuiches() {
  const raw = localStorage.getItem(GUICHES_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
function _writeGuiches(obj) {
  localStorage.setItem(GUICHES_KEY, JSON.stringify(obj));
}

function _readMeta() {
  const raw = localStorage.getItem(META_KEY);
  if (!raw) return { lastTipoChamado: null };
  try { return JSON.parse(raw); } catch {
    return { lastTipoChamado: null };
  }
}
function _writeMeta(obj) {
  localStorage.setItem(META_KEY, JSON.stringify(obj));
}

// ------------------------
// Inicializar guichês
// ------------------------
export function initGuiches(count = 3) {
  let raw = _readGuiches();

  // criar se não existir
  if (!raw || !raw.guiches) {
    const guiches = [];
    for (let i = 1; i <= count; i++) {
      guiches.push({ id: i, busyUntil: 0 });
    }
    _writeGuiches({ guiches });
    return;
  }
}

// Pega primeiro guichê livre (menor ID)
function getAvailableGuiche() {
  const data = _readGuiches();
  if (!data || !data.guiches) return null;

  const now = Date.now();
  return data.guiches.find(g => g.busyUntil <= now)?.id || null;
}

// Marca guichê ocupado até busyUntil
function occupyGuiche(id, busyUntil) {
  const data = _readGuiches();
  if (!data || !data.guiches) return;

  const g = data.guiches.find(x => x.id === id);
  if (g) g.busyUntil = busyUntil;

  _writeGuiches(data);
}

// ------------------------
// Tempo Médio (TM)
// ------------------------
function gerarTM(tipo) {
  if (tipo === "SP") {
    return 10 + Math.random() * 10; // 10–20 minutos
  }
  if (tipo === "SG") {
    return 2 + Math.random() * 6; // 2–8 minutos
  }
  if (tipo === "SE") {
    return Math.random() < 0.95 ? 1 : 5; // 1min (95%) ou 5min (5%)
  }
  return 3;
}

// ------------------------
// Gerar senha
// ------------------------
export function gerarSenha(tipo) {
  const state = _read();
  if (!state.seq) state.seq = { SP: 0, SG: 0, SE: 0 };

  state.seq[tipo] = (state.seq[tipo] || 0) + 1;

  const seq = state.seq[tipo];
  const d = new Date();

  const YY = String(d.getFullYear()).slice(-2);
  const MM = String(d.getMonth() + 1).padStart(2, '0');
  const DD = String(d.getDate()).padStart(2, '0');
  const sq = String(seq).padStart(4, '0');
  const id = `${YY}${MM}${DD}-${tipo}${sq}`;

  const expiry = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 17, 0, 0).getTime();

  const obj = {
    id,
    tipo,
    numeroSeq: seq,
    criadoEm: d.getTime(),
    chamadoEm: null,
    finalizadoEm: null,
    tmAplicado: null,
    guiche: null,
    expiry,
    descartada: false
  };

  state.senhas.push(obj);
  _write(state);

  return obj;
}

// ------------------------
// Listagens
// ------------------------
export function listarSenhasAtivas() {
  const state = _read();
  const now = Date.now();
  return state.senhas.filter(s =>
    !s.chamadoEm &&
    !s.descartada &&
    (!s.expiry || s.expiry > now)
  );
}

export function listarTodasSenhas() {
  return _read().senhas;
}

// ------------------------
// Sequência SP -> (SE|SG) -> SP -> ...
// ------------------------
function proximaPrioridade(filas, ultimoTipo) {
  // primeira chamada
  if (!ultimoTipo) {
    if (filas.SP.length > 0) return "SP";
    if (filas.SE.length > 0) return "SE";
    if (filas.SG.length > 0) return "SG";
    return null;
  }

  if (ultimoTipo === "SP") {
    if (filas.SE.length > 0) return "SE";
    if (filas.SG.length > 0) return "SG";
    if (filas.SP.length > 0) return "SP";
    return null;
  }

  // último foi SE ou SG
  if (filas.SP.length > 0) return "SP";
  if (filas.SE.length > 0) return "SE";
  if (filas.SG.length > 0) return "SG";
  return null;
}

// ------------------------
// Chamar próxima senha
// ------------------------
export function chamarProximaSenha() {
  const state = _read();
  const meta = _readMeta();
  const now = Date.now();

  // limpa expiradas
  state.senhas = state.senhas.filter(s => !s.expiry || s.expiry > now);

  // separar filas
  const filas = { SP: [], SE: [], SG: [] };
  for (const s of state.senhas) {
    if (!s.chamadoEm && !s.descartada) filas[s.tipo].push(s);
  }

  const tipo = proximaPrioridade(filas, meta.lastTipoChamado);
  if (!tipo) return null;

  const selecionada = filas[tipo][0];
  if (!selecionada) return null;

  // achar guichê disponível
  const guiche = getAvailableGuiche();
  if (!guiche) {
    return { error: true, message: "Nenhum guichê disponível no momento." };
  }

  // gerar TM e finalizar horário
  const tm = gerarTM(tipo);
  const ms = tm * 60 * 1000;
  const finaliza = now + ms;

  // atualizar senha
  const idx = state.senhas.findIndex(s => s.id === selecionada.id);
  state.senhas[idx].chamadoEm = now;
  state.senhas[idx].finalizadoEm = finaliza;
  state.senhas[idx].tmAplicado = tm;
  state.senhas[idx].guiche = guiche;

  _write(state);

  // ocupar guichê
  occupyGuiche(guiche, finaliza);

  // atualizar meta
  meta.lastTipoChamado = tipo;
  _writeMeta(meta);

  return state.senhas[idx];
}

// ------------------------
// Resetar tudo
// ------------------------
export function resetAll() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(GUICHES_KEY);
  localStorage.removeItem(META_KEY);
}
