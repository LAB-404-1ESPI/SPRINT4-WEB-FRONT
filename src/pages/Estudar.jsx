import { useMemo, useState } from "react";
import { BookOpen, FileText, Search, Sparkles } from "lucide-react";
import { jovixApi } from "../api/mockApi.js";

export default function Estudar() {
	const [q, setQ] = useState("");
	const [items, setItems] = useState([]);
	const [searched, setSearched] = useState(false);
	const [loading, setLoading] = useState(false);

	async function search(e) {
		e.preventDefault();
		setLoading(true);
		setItems(await jovixApi.buscar(q));
		setSearched(true);
		setLoading(false);
	}

	const description = useMemo(
		() =>
			q.trim()
				? `Resultados para “${q}”`
				: "Pesquise pelo título, descrição ou conteúdo de um material.",
		[q],
	);

	return (
		<main className="page-wrap">
			<p className="eyebrow">CENTRAL DE ESTUDOS</p>
			<h1 className="page-title">Encontre seu conteúdo.</h1>
			<p className="mt-3 text-slate-400">
				Busque em todos os materiais cadastrados na biblioteca.
			</p>

			<form
				onSubmit={search}
				className="panel mt-8 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row"
			>
				<div className="relative flex-1">
					<Search
						className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
						size={19}
					/>
					<input
						className="field pl-12"
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Ex.: regra da cadeia, Python, funções..."
					/>
				</div>
				<button className="btn-primary" disabled={!q.trim() || loading}>
					{loading ? "Buscando..." : "Buscar materiais"}
				</button>
			</form>

			<div className="mt-8 flex items-center gap-3">
				<Sparkles className="text-jovix-cyan" />
				<div>
					<h2 className="font-bold">Busca na biblioteca</h2>
					<p className="text-sm text-slate-500">{description}</p>
				</div>
			</div>

			{searched &&
				(items.length ? (
					<div className="mt-5 grid gap-4 md:grid-cols-2">
						{items.map((x) => (
							<article className="panel rounded-2xl p-5" key={x.id}>
								<span className="inline-flex items-center gap-2 text-xs font-semibold text-jovix-cyan">
									<FileText size={15} />
									{x.tipo}
								</span>
								<h3 className="mt-3 text-lg font-bold">{x.titulo}</h3>
								<p className="mt-2 text-sm text-slate-400">{x.descricao}</p>
								{x.texto && (
									<p className="mt-4 rounded-xl bg-black/20 p-4 text-sm leading-6 text-slate-300">
										{x.texto}
									</p>
								)}
							</article>
						))}
					</div>
				) : (
					<div className="mt-5 rounded-2xl border border-dashed border-white/15 p-10 text-center">
						<BookOpen className="mx-auto text-jovix-cyan" size={32} />
						<p className="mt-3 font-semibold">Nenhum resultado encontrado.</p>
						<p className="mt-1 text-sm text-slate-400">
							Tente outra palavra-chave.
						</p>
					</div>
				))}

			<div className="mt-10 rounded-2xl border border-cyan-400/15 bg-cyan-400/[.035] p-5">
				<p className="text-sm leading-6 text-slate-400">
					Esta é uma simulação de busca textual sobre os dados cadastrados. A
					área não utiliza um serviço externo de inteligência artificial.
				</p>
			</div>
		</main>
	);
}
