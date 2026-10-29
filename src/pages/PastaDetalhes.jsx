import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Plus, Trash2, X } from "lucide-react";
import { jovixApi } from "../api/mockApi.js";

export default function PastaDetalhes() {
	const { materiaId, pastaId } = useParams();
	const [materia, setMateria] = useState(null);
	const [pasta, setPasta] = useState(null);
	const [items, setItems] = useState([]);
	const [show, setShow] = useState(false);
	const [form, setForm] = useState({
		titulo: "",
		descricao: "",
		tipo: "Anotação",
		texto: "",
	});
	const [erro, setErro] = useState("");

	async function load() {
		const [ms, ps, ds] = await Promise.all([
			jovixApi.listarMaterias(),
			jovixApi.listarPastas(materiaId),
			jovixApi.listarMateriais({ pastaId }),
		]);

		setMateria(ms.find((x) => x.id === materiaId));
		setPasta(ps.find((x) => x.id === pastaId));
		setItems(ds);
	}

	useEffect(() => {
		load();
	}, [materiaId, pastaId]);

	async function add(e) {
		e.preventDefault();

		if (!form.titulo.trim()) {
			return setErro("Informe o título do material.");
		}

		await jovixApi.criarMaterial({ materiaId, pastaId, ...form });
		setForm({ titulo: "", descricao: "", tipo: "Anotação", texto: "" });
		setErro("");
		setShow(false);
		load();
	}

	async function del(id) {
		if (confirm("Excluir este material?")) {
			await jovixApi.excluirMaterial(id);
			load();
		}
	}

	if (!pasta) {
		return <main className="page-wrap">Carregando pasta...</main>;
	}

	return (
		<main className="page-wrap">
			<Link to={`/materias/${materiaId}`} className="back-link">
				<ArrowLeft size={17} /> {materia?.nome || "Voltar à matéria"}
			</Link>

			<div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<p className="eyebrow">{materia?.nome} / PASTA</p>
					<h1 className="page-title">{pasta.nome}</h1>
					<p className="mt-3 text-slate-400">{pasta.descricao}</p>
				</div>
				<button onClick={() => setShow(!show)} className="btn-primary">
					{show ? <X size={18} /> : <Plus size={18} />} Novo material
				</button>
			</div>

			{show && (
				<form
					onSubmit={add}
					className="panel mt-7 grid gap-3 rounded-2xl p-5 md:grid-cols-2"
				>
					<input
						className="field"
						placeholder="Título do material"
						value={form.titulo}
						onChange={(e) => setForm({ ...form, titulo: e.target.value })}
					/>
					<select
						className="field"
						value={form.tipo}
						onChange={(e) => setForm({ ...form, tipo: e.target.value })}
					>
						{["Lousa", "Anotação", "Exercício", "Resumo", "Slide", "Outro"].map(
							(x) => (
								<option key={x}>{x}</option>
							),
						)}
					</select>
					<input
						className="field md:col-span-2"
						placeholder="Descrição"
						value={form.descricao}
						onChange={(e) => setForm({ ...form, descricao: e.target.value })}
					/>
					<textarea
						className="field min-h-28 md:col-span-2"
						placeholder="Anotações ou conteúdo do material (opcional)"
						value={form.texto}
						onChange={(e) => setForm({ ...form, texto: e.target.value })}
					/>
					{erro && (
						<p className="text-sm text-red-300 md:col-span-2">{erro}</p>
					)}
					<button className="btn-primary md:col-span-2">Salvar material</button>
				</form>
			)}

			<div className="mt-9 flex items-center justify-between">
				<h2 className="text-xl font-bold">Materiais</h2>
				<span className="text-sm text-slate-500">{items.length} itens</span>
			</div>

			{items.length === 0 ? (
				<div className="mt-5 rounded-2xl border border-dashed border-white/15 p-10 text-center">
					<FileText className="mx-auto text-jovix-cyan" size={34} />
					<p className="mt-3 font-semibold">Nenhum material nesta pasta.</p>
					<p className="mt-1 text-sm text-slate-400">
						Adicione resumos, anotações e exercícios.
					</p>
				</div>
			) : (
				<div className="mt-5 grid gap-4 md:grid-cols-2">
					{items.map((x) => (
						<article className="panel rounded-2xl p-5" key={x.id}>
							<div className="flex items-start justify-between">
								<span className="icon-box">
									<FileText />
								</span>
								<button
									className="p-2 text-slate-500 hover:text-red-300"
									onClick={() => del(x.id)}
									aria-label="Excluir material"
								>
									<Trash2 size={17} />
								</button>
							</div>
							<span className="mt-5 inline-block rounded-md bg-cyan-400/10 px-2 py-1 text-xs text-jovix-cyan">
								{x.tipo}
							</span>
							<h3 className="mt-3 text-lg font-bold">{x.titulo}</h3>
							{x.descricao && (
								<p className="mt-2 text-sm text-slate-400">{x.descricao}</p>
							)}
							{x.texto && (
								<div className="mt-4 rounded-xl bg-black/20 p-4 text-sm leading-6 text-slate-300">
									{x.texto}
								</div>
							)}
							<p className="mt-4 text-xs text-slate-600">
								Adicionado em {new Date(x.createdAt).toLocaleDateString("pt-BR")}
							</p>
						</article>
					))}
				</div>
			)}
		</main>
	);
}
