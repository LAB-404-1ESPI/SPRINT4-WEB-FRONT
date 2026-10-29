// API simulada do JOVIX. Não existe servidor nem banco de dados nesta versão.
// Os métodos assíncronos simulam requisições e persistem os dados no localStorage.
const STORAGE_KEY = "jovix-demo-v1";

const initialData = {
  materias: [
    { id: "mat-1", nome: "Matemática", descricao: "Funções, cálculo, geometria e álgebra.", cor: "cyan", icon: "∑" },
    { id: "mat-2", nome: "Programação", descricao: "Lógica, Python, JavaScript e desenvolvimento.", cor: "blue", icon: "{ }" },
    { id: "mat-3", nome: "Física", descricao: "Mecânica, energia e fenômenos físicos.", cor: "violet", icon: "∿" },
    { id: "mat-4", nome: "História", descricao: "Períodos históricos e acontecimentos importantes.", cor: "pink", icon: "⌛" },
  ],
  pastas: [
    { id: "pas-1", materiaId: "mat-1", nome: "Funções", descricao: "Funções do primeiro e segundo grau" },
    { id: "pas-2", materiaId: "mat-1", nome: "Cálculo", descricao: "Limites e derivadas" },
    { id: "pas-3", materiaId: "mat-2", nome: "Python", descricao: "Fundamentos e estruturas" },
    { id: "pas-4", materiaId: "mat-2", nome: "React", descricao: "Componentes e Hooks" },
    { id: "pas-5", materiaId: "mat-3", nome: "Mecânica", descricao: "Movimento e leis de Newton" },
    { id: "pas-6", materiaId: "mat-4", nome: "Revolução Industrial", descricao: "Transformações dos séculos XVIII e XIX" },
  ],
  materiais: [
    { id: "doc-1", materiaId: "mat-1", pastaId: "pas-1", titulo: "Resumo de funções", descricao: "Domínio, imagem e gráficos de funções.", tipo: "Resumo", texto: "Uma função relaciona cada elemento do domínio a exatamente um elemento do contradomínio.", createdAt: "2026-10-25T10:00:00.000Z" },
    { id: "doc-2", materiaId: "mat-1", pastaId: "pas-2", titulo: "Regra da cadeia", descricao: "Anotações sobre derivação de funções compostas.", tipo: "Anotação", texto: "Se y = f(g(x)), então y' = f'(g(x)) · g'(x).", createdAt: "2026-10-26T14:30:00.000Z" },
    { id: "doc-3", materiaId: "mat-2", pastaId: "pas-3", titulo: "Estruturas condicionais", descricao: "if, elif e else em Python.", tipo: "Aula", texto: "Estruturas condicionais permitem executar blocos diferentes conforme uma condição.", createdAt: "2026-10-27T09:15:00.000Z" },
    { id: "doc-4", materiaId: "mat-3", pastaId: "pas-5", titulo: "Leis de Newton", descricao: "Conceitos fundamentais da dinâmica.", tipo: "Resumo", texto: "As leis de Newton descrevem a relação entre o movimento de um corpo e as forças que atuam sobre ele.", createdAt: "2026-10-28T16:00:00.000Z" },
  ],
  equipe: [
    { id: "eq-1", nome: "Arthur Caram Fiorese Herrada", rm: "569578", foto: "arthur.png", funcao: "Desenvolvimento em CSS" },
    { id: "eq-2", nome: "Gustavo Ferreira Silva", rm: "571675", foto: "gustavo.jpeg", funcao: "Integração semântica" },
    { id: "eq-3", nome: "Felipe Ricardo Moreira Aguiar", rm: "573410", foto: "felipe.jpeg", funcao: "JavaScript e menu" },
    { id: "eq-4", nome: "Matheus Sequeira Franco da Silva", rm: "571127", foto: "sequeira.jpeg", funcao: "Imagens e conteúdos" },
    { id: "eq-5", nome: "Matheus Medeiros da Cunha", rm: "572780", foto: "cunha.jpeg", funcao: "Estrutura e organização" },
  ],
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const wait = () => new Promise((resolve) => setTimeout(resolve, 120));
function readDB() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* se o conteúdo local estiver inválido, restaura a demonstração */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return clone(initialData);
}
function writeDB(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function makeId(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

export const jovixApi = {
  async listarMaterias() { await wait(); return clone(readDB().materias); },
  async criarMateria(payload) {
    await wait(); const db = readDB();
    const item = { id: makeId("mat"), nome: payload.nome.trim(), descricao: payload.descricao?.trim() || "Matéria adicionada pelo estudante.", cor: "cyan", icon: "✦" };
    db.materias.push(item); writeDB(db); return clone(item);
  },
  async atualizarMateria(id, payload) {
    await wait(); const db = readDB(); const item = db.materias.find((x) => x.id === id);
    if (!item) throw new Error("Matéria não encontrada."); Object.assign(item, payload); writeDB(db); return clone(item);
  },
  async excluirMateria(id) {
    await wait(); const db = readDB(); db.materias = db.materias.filter((x) => x.id !== id);
    const folderIds = db.pastas.filter((x) => x.materiaId === id).map((x) => x.id);
    db.pastas = db.pastas.filter((x) => x.materiaId !== id);
    db.materiais = db.materiais.filter((x) => x.materiaId !== id && !folderIds.includes(x.pastaId)); writeDB(db); return true;
  },
  async listarPastas(materiaId) { await wait(); return clone(readDB().pastas.filter((x) => !materiaId || x.materiaId === materiaId)); },
  async criarPasta(payload) {
    await wait(); const db = readDB(); const item = { id: makeId("pas"), materiaId: payload.materiaId, nome: payload.nome.trim(), descricao: payload.descricao?.trim() || "Pasta de estudos" };
    db.pastas.push(item); writeDB(db); return clone(item);
  },
  async excluirPasta(id) {
    await wait(); const db = readDB(); db.pastas = db.pastas.filter((x) => x.id !== id); db.materiais = db.materiais.filter((x) => x.pastaId !== id); writeDB(db); return true;
  },
  async listarMateriais(filtros = {}) {
    await wait(); const db = readDB(); return clone(db.materiais.filter((x) => (!filtros.materiaId || x.materiaId === filtros.materiaId) && (!filtros.pastaId || x.pastaId === filtros.pastaId)));
  },
  async criarMaterial(payload) {
    await wait(); const db = readDB(); const item = { id: makeId("doc"), materiaId: payload.materiaId, pastaId: payload.pastaId || "", titulo: payload.titulo.trim(), descricao: payload.descricao?.trim() || "", tipo: payload.tipo || "Anotação", texto: payload.texto?.trim() || "", createdAt: new Date().toISOString() };
    db.materiais.unshift(item); writeDB(db); return clone(item);
  },
  async excluirMaterial(id) { await wait(); const db = readDB(); db.materiais = db.materiais.filter((x) => x.id !== id); writeDB(db); return true; },
  async buscar(termo) {
    await wait(); const db = readDB(); const q = termo.trim().toLowerCase();
    if (!q) return [];
    return clone(db.materiais.filter((item) => {
      const materia = db.materias.find((x) => x.id === item.materiaId)?.nome || "";
      const pasta = db.pastas.find((x) => x.id === item.pastaId)?.nome || "";
      return [item.titulo, item.descricao, item.tipo, item.texto, materia, pasta].some((v) => v.toLowerCase().includes(q));
    }));
  },
  async resumo() {
    await wait(); const db = readDB();
    return { materias: db.materias.length, pastas: db.pastas.length, materiais: db.materiais.length, recentes: clone(db.materiais.slice(0, 4)) };
  },
  async listarEquipe() { await wait(); return clone(readDB().equipe); },
  async restaurarDemo() { await wait(); writeDB(clone(initialData)); return true; },
};
