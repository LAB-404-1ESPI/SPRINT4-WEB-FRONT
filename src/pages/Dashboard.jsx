import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	BookOpen,
	FolderOpen,
	Layers3,
	ArrowUpRight,
	Search,
	Sparkles,
	Clock3,
} from "lucide-react";
import { jovixApi } from "../api/mockApi.js";

export default function Dashboard() {
	const [data, setData] = useState(null);

	useEffect(() => {
		jovixApi.resumo().then(setData);
	}, []);

	const stats = [
		{
			label: "Matérias",
			value: data?.materias ?? "—",
			icon: BookOpen,
			to: "/materias",
		},
		{
			label: "Pastas",
			value: data?.pastas ?? "—",
			icon: FolderOpen,
			to: "/materias",
		},
		{
			label: "Materiais",
			value: data?.materiais ?? "—",
			icon: Layers3,
			to: "/materias",
		},
	];

	return (
		<main className="page-wrap">
			<div className="mb-9">
				<p className="eyebrow">PAINEL DO ESTUDANTE</p>
				<h1 className="page-title">
					Bem-vindo ao <span className="text-jovix-cyan">JOVIX.</span>
				</h1>
				<p className="mt-3 text-slate-400">
					Sua biblioteca acadêmica em um só lugar.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				{stats.map(({ label, value, icon: Icon, to }) => (
					<Link to={to} key={label} className="stat-card">
						<span className="icon-box">
							<Icon size={23} />
						</span>
						<p className="mt-5 text-3xl font-extrabold">{value}</p>
						<p className="mt-1 text-sm text-slate-400">{label}</p>
						<ArrowUpRight className="absolute right-5 top-5 text-slate-500" />
					</Link>
				))}
			</div>

			<div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
				<section className="panel rounded-3xl p-6 sm:p-8">
					<div className="flex items-center gap-3">
						<Clock3 className="text-jovix-cyan" />
						<h2 className="text-xl font-bold">Adicionados recentemente</h2>
					</div>
					{data?.recentes?.length ? (
						<div className="mt-5 divide-y divide-white/10">
							{data.recentes.map((x) => (
								<div
									key={x.id}
									className="flex items-center justify-between gap-3 py-4"
								>
									<div>
										<p className="font-semibold">{x.titulo}</p>
										<p className="mt-1 text-sm text-slate-400">
											{x.tipo} • {new Date(x.createdAt).toLocaleDateString("pt-BR")}
										</p>
									</div>
									<span className="rounded-lg bg-cyan-400/10 px-3 py-1 text-xs text-jovix-cyan">
										Material
									</span>
								</div>
							))}
						</div>
					) : (
						<p className="mt-5 text-slate-400">
							Ainda não há materiais cadastrados.
						</p>
					)}
				</section>

				<section className="panel rounded-3xl p-6 sm:p-8">
					<Sparkles className="text-jovix-cyan" size={27} />
					<h2 className="mt-4 text-xl font-bold">Continue aprendendo</h2>
					<p className="mt-2 text-sm leading-6 text-slate-400">
						Acesse sua biblioteca para organizar matérias e registrar novos
						conteúdos de estudo.
					</p>
					<Link to="/materias" className="btn-primary mt-6 w-full">
						Abrir biblioteca <ArrowUpRight size={17} />
					</Link>
					<Link to="/estudar" className="btn-secondary mt-3 w-full">
						Área de estudos
					</Link>
				</section>
			</div>

			<div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/[.04] p-5 sm:flex-row sm:items-center">
				<div className="flex items-center gap-3">
					<Search className="text-jovix-cyan" />
					<div>
						<h3 className="font-bold">Está procurando um conteúdo?</h3>
						<p className="text-sm text-slate-400">
							Pesquise em todos os materiais da biblioteca.
						</p>
					</div>
				</div>
				<Link to="/estudar" className="btn-secondary">
					Pesquisar agora
				</Link>
			</div>

			<p className="mt-6 text-center text-xs text-slate-600">
				Demonstração acadêmica • Dados simulados pela API local do projeto
			</p>
		</main>
	);
}
