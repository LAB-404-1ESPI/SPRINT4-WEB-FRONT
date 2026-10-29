import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FolderOpen, Plus, Trash2, FileText } from "lucide-react";
import { jovixApi } from "../api/mockApi.js";

export default function MateriaDetalhes() {
	const { materiaId } = useParams();
	const [materia, setMateria] = useState(null);
	const [pastas, setPastas] = useState([]);
	const [materiais, setMateriais] = useState([]);
	const [loading, setLoading] = useState(true);
	const [show, setShow] = useState(false);
	const [nome, setNome] = useState("");
	const [descricao, setDescricao] = useState("");
	const [erro, setErro] = useState("");

	async function load() {
		setLoading(true);
		const [ms, ps, ds] = await Promise.all([
			jovixApi.listarMaterias(),
			jovixApi.listarPastas(materiaId),
			jovixApi.listarMateriais({ materiaId }),
		]);
		setMateria(ms.find((x) => x.id === materiaId) || null);
		setPastas(ps);
		setMateriais(ds);
		setLoading(false);
	}

	useEffect(() => {
		load();
	}, [materiaId]);

	const docsByFolder = useMemo(
		() =>
			materiais.reduce(
				(a, x) => ({ ...a, [x.pastaId]: (a[x.pastaId] || 0) + 1 }),
				{},
			),
		[materiais],
	);

	async function add(e) {
		e.preventDefault();
		if (!nome.trim()) return setErro("Dê um nome para a pasta.");

		await jovixApi.criarPasta({ materiaId, nome, descricao });
		setNome("");
		setDescricao("");
		setShow(false);
		setErro("");
		load();
	}

	async function del(id) {
		if (confirm("Excluir a pasta e os materiais dela?")) {
			await jovixApi.excluirPasta(id);
			load();
		}
	}

	if (loading) return <main className="page-wrap">Carregando...</main>;

	if (!materia) {
		return (
			<main className="page-wrap">
				<h1 className="page-title">Matéria não encontrada</h1>
				<Link to="/materias" className="btn-secondary mt-5">
					Voltar
				</Link>
			</main>
		);
	}

	return (
		<main className="page-wrap">
			<Link to="/materias" className="back-link">
				<ArrowLeft size={17} /> Todas as matérias
			</Link>

			<div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="eyebrow">BIBLIOTECA / MATÉRIA</p>
					<h1 className="page-title">{materia.nome}</h1>
					<p className="mt-3 text-slate-400">{materia.descricao}</p>
				</div>
				<button onClick={() => setShow(!show)} className="btn-primary">
					<Plus size={18} /> Nova pasta
				</button>
			</div>

			{show && (
				<form
					onSubmit={add}
					className="panel mt-7 grid gap-3 rounded-2xl p-5 md:grid-cols-[1fr_1.4fr_auto]"
				>
					<input
						className="field"
						placeholder="Nome da pasta"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
					/>
					<input
						className="field"
						placeholder="Descrição opcional"
						value={descricao}
						onChange={(e) => setDescricao(e.target.value)}
					/>
					<button className="btn-primary">Criar pasta</button>
					{erro && (
						<p className="text-sm text-red-300 md:col-span-3">{erro}</p>
					)}
				</form>
			)}

			<div className="mt-9 flex items-center justify-between">
				<h2 className="text-xl font-bold">Pastas e assuntos</h2>
				<span className="text-sm text-slate-500">{pastas.length} pastas</span>
			</div>

			{pastas.length === 0 ? (
				<div className="mt-5 rounded-2xl border border-dashed border-white/15 p-10 text-center">
					<FolderOpen size={34} className="mx-auto text-jovix-cyan" />
					<p className="mt-3 font-semibold">
						Essa matéria ainda não tem pastas.
					</p>
					<p className="mt-1 text-sm text-slate-400">
						Crie uma pasta para separar os assuntos.
					</p>
				</div>
			) : (
				<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{pastas.map((p) => (
						<article className="subject-card" key={p.id}>
							<div className="flex items-start justify-between">
								<span className="icon-box">
									<FolderOpen size={23} />
								</span>
								<button
									className="p-2 text-slate-500 hover:text-red-300"
									onClick={() => del(p.id)}
									aria-label="Excluir pasta"
								>
									<Trash2 size={17} />
								</button>
							</div>
							<h3 className="mt-5 text-lg font-bold">{p.nome}</h3>
							<p className="mt-2 text-sm text-slate-400">{p.descricao}</p>
							<p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
								<FileText size={14} /> {docsByFolder[p.id] || 0} materiais
							</p>
							<Link
								to={`/materias/${materiaId}/pastas/${p.id}`}
								className="btn-secondary mt-5 w-full"
							>
								Abrir pasta →
							</Link>
						</article>
					))}
				</div>
			)}

			<section className="mt-10">
				<h2 className="text-xl font-bold">Materiais recentes</h2>
				{materiais.filter((x) => !x.pastaId).length === 0 ? (
					<p className="mt-3 text-sm text-slate-500">
						Materiais adicionados diretamente à matéria aparecem aqui.
					</p>
				) : (
					materiais
						.filter((x) => !x.pastaId)
						.map((x) => (
							<p className="mt-3" key={x.id}>
								{x.titulo}
							</p>
						))
				)}
			</section>
		</main>
	);
}
