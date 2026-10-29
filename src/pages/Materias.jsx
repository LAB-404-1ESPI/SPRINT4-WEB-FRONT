import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Plus, Trash2, FolderOpen, Search, X } from "lucide-react";
import { useMaterias } from "../hooks/useJovix.js";
import { jovixApi } from "../api/mockApi.js";

export default function Materias() {
	const { materias, loading, adicionar, remover } = useMaterias();
	const [pastas, setPastas] = useState([]);
	const [nome, setNome] = useState("");
	const [descricao, setDescricao] = useState("");
	const [busca, setBusca] = useState("");
	const [form, setForm] = useState(false);
	const [erro, setErro] = useState("");
	const [busy, setBusy] = useState(false);

	useEffect(() => {
		jovixApi.listarPastas().then(setPastas);
	}, []);

	const filtered = useMemo(
		() =>
			materias.filter((x) =>
				`${x.nome} ${x.descricao}`.toLowerCase().includes(busca.toLowerCase()),
			),
		[materias, busca],
	);

	async function submit(e) {
		e.preventDefault();
		if (!nome.trim()) return setErro("Informe o nome da matéria.");
		if (
			materias.some(
				(x) => x.nome.toLowerCase() === nome.trim().toLowerCase(),
			)
		) {
			return setErro("Essa matéria já existe.");
		}

		setBusy(true);
		setErro("");
		try {
			await adicionar({ nome, descricao });
			setNome("");
			setDescricao("");
			setForm(false);
		} catch {
			setErro("Não foi possível cadastrar.");
		} finally {
			setBusy(false);
		}
	}

	async function del(id) {
		if (!confirm("Excluir esta matéria e suas pastas e materiais?")) return;
		await remover(id);
		setPastas(await jovixApi.listarPastas());
	}

	return (
		<main className="page-wrap">
			<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="eyebrow">SUA BIBLIOTECA</p>
					<h1 className="page-title">Minhas matérias</h1>
					<p className="mt-3 text-slate-400">
						Organize seus conteúdos por disciplina e assunto.
					</p>
				</div>
				<button className="btn-primary" onClick={() => setForm(!form)}>
					{form ? <X size={18} /> : <Plus size={18} />} {form ? "Fechar" : "Nova matéria"}
				</button>
			</div>

			{form && (
				<form
					onSubmit={submit}
					className="panel mt-7 grid gap-3 rounded-2xl p-5 md:grid-cols-[1fr_1.4fr_auto]"
				>
					<input
						className="field"
						placeholder="Nome da matéria"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						maxLength={60}
					/>
					<input
						className="field"
						placeholder="Descrição (opcional)"
						value={descricao}
						onChange={(e) => setDescricao(e.target.value)}
						maxLength={120}
					/>
					<button className="btn-primary" disabled={busy}>
						{busy ? "Salvando..." : "Cadastrar"}
					</button>
					{erro && (
						<p className="text-sm text-red-300 md:col-span-3">{erro}</p>
					)}
				</form>
			)}

			<div className="relative mt-7">
				<Search
					className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
					size={18}
				/>
				<input
					className="field pl-11"
					placeholder="Buscar matéria..."
					value={busca}
					onChange={(e) => setBusca(e.target.value)}
				/>
			</div>

			{loading ? (
				<p className="py-12 text-center text-slate-400">
					Carregando biblioteca...
				</p>
			) : filtered.length === 0 ? (
				<div className="mt-8 rounded-2xl border border-dashed border-white/15 p-12 text-center">
					<BookOpen className="mx-auto text-jovix-cyan" size={35} />
					<h2 className="mt-4 text-lg font-bold">
						Nenhuma matéria encontrada
					</h2>
					<p className="mt-2 text-sm text-slate-400">
						Cadastre uma matéria ou ajuste sua busca.
					</p>
				</div>
			) : (
				<div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
					{filtered.map((m, i) => {
						const count = pastas.filter((p) => p.materiaId === m.id).length;

						return (
							<article key={m.id} className="subject-card">
								<div className="flex items-start justify-between">
									<span className="icon-box text-2xl font-bold">
										{m.icon || "✦"}
									</span>
									<button
										className="rounded-lg p-2 text-slate-500 hover:bg-red-400/10 hover:text-red-300"
										aria-label="Excluir matéria"
										onClick={() => del(m.id)}
									>
										<Trash2 size={17} />
									</button>
								</div>
								<p className="mt-5 text-xs font-bold tracking-widest text-jovix-cyan">
									DISCIPLINA {String(i + 1).padStart(2, "0")}
								</p>
								<h2 className="mt-2 text-xl font-bold">{m.nome}</h2>
								<p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
									{m.descricao}
								</p>
								<div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4 text-xs text-slate-400">
									<span className="flex items-center gap-1.5">
										<FolderOpen size={14} /> {count} pastas
									</span>
								</div>
								<Link
									to={`/materias/${m.id}`}
									className="btn-secondary mt-5 w-full"
								>
									Abrir matéria <span>→</span>
								</Link>
							</article>
						);
					})}
				</div>
			)}

			<p className="mt-8 text-center text-xs text-slate-600">
				Os dados são simulados e ficam salvos neste navegador.
			</p>
		</main>
	);
}
