import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<main className="page-wrap text-center">
			<p className="text-6xl font-black text-jovix-cyan">404</p>
			<h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
			<Link to="/" className="btn-primary mt-7">
				Voltar ao início
			</Link>
		</main>
	);
}
