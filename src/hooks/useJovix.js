import { useCallback, useEffect, useMemo, useState } from "react";
import { jovixApi } from "../api/mockApi.js";

export function useMaterias() {
  const [materias, setMaterias] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const carregar = useCallback(async () => { try { setError(""); setLoading(true); setMaterias(await jovixApi.listarMaterias()); } catch (e) { setError(e.message || "Erro ao carregar matérias."); } finally { setLoading(false); } }, []);
  useEffect(() => { carregar(); }, [carregar]);
  const adicionar = useCallback(async (payload) => { const item = await jovixApi.criarMateria(payload); setMaterias((old) => [...old, item]); return item; }, []);
  const remover = useCallback(async (id) => { await jovixApi.excluirMateria(id); setMaterias((old) => old.filter((x) => x.id !== id)); }, []);
  return { materias, loading, error, carregar, adicionar, remover };
}

export function useBiblioteca() {
  const [materias, setMaterias] = useState([]); const [pastas, setPastas] = useState([]); const [materiais, setMateriais] = useState([]); const [loading, setLoading] = useState(true);
  const carregar = useCallback(async () => { setLoading(true); try { const [m, p, d] = await Promise.all([jovixApi.listarMaterias(), jovixApi.listarPastas(), jovixApi.listarMateriais()]); setMaterias(m); setPastas(p); setMateriais(d); } finally { setLoading(false); } }, []);
  useEffect(() => { carregar(); }, [carregar]);
  const dados = useMemo(() => ({ materias: materias.length, pastas: pastas.length, materiais: materiais.length }), [materias, pastas, materiais]);
  return { materias, pastas, materiais, loading, dados, carregar, setPastas, setMateriais };
}
