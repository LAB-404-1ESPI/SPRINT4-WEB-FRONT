# JOVIX — Simulação em React + JavaScript + Tailwind CSS v4

Projeto demonstrativo do grupo LAB-404 (FIAP — Engenharia de Software, turma 1ESPI).

## Tecnologias
- React com JavaScript (JSX)
- Vite
- Tailwind CSS v4
- React Router DOM
- Lucide React

## Como executar
Requisitos: Node.js e npm instalados apenas para executar as ferramentas de desenvolvimento do frontend.

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## API simulada
A pasta `src/api/` contém `mockApi.js`, que funciona como uma API simulada dentro da aplicação. Ela disponibiliza métodos assíncronos para listar, criar, atualizar e excluir matérias, pastas e materiais, além de busca, resumo do painel e dados da equipe.

Os dados iniciais ficam definidos nesse arquivo. As alterações são salvas no `localStorage` do navegador, permitindo atualizar a página sem perder os dados cadastrados naquele navegador. Não existe servidor, banco de dados, SQL ou serviço externo.


## Rotas
- `/` — Landing page com as seções A Solução, Público-Alvo, Galeria, Nossa Equipe e Contato.
- `/app` — Painel com contadores e materiais recentes.
- `/materias` — Biblioteca de matérias.
- `/materias/:materiaId` — Pastas de uma matéria.
- `/materias/:materiaId/pastas/:pastaId` — Materiais de uma pasta.
- `/estudar` — Busca textual nos materiais cadastrados.

## Estrutura principal
```
src/
├── api/
│   └── mockApi.js
├── assets/imgs/       # Imagens originais do Sprint 03
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
├── hooks/
│   └── useJovix.js
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Materias.jsx
│   ├── MateriaDetalhes.jsx
│   ├── PastaDetalhes.jsx
│   ├── Estudar.jsx
│   └── NotFound.jsx
├── App.jsx
├── index.css
└── main.jsx
```

**## LINK DO VERCEL**

https://sprint4-web-front.vercel.app

**## LINK DO GITHUB**

https://github.com/LAB-404-1ESPI/SPRINT4-WEB-FRONT
