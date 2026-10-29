import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Materias from "./pages/Materias.jsx";
import MateriaDetalhes from "./pages/MateriaDetalhes.jsx";
import PastaDetalhes from "./pages/PastaDetalhes.jsx";
import Estudar from "./pages/Estudar.jsx";
import NotFound from "./pages/NotFound.jsx";
export default function App() {
	return (
		<div className="min-h-screen bg-jovix-bg text-white">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/app" element={<Dashboard />} />
				<Route path="/materias" element={<Materias />} />
				<Route path="/materias/:materiaId" element={<MateriaDetalhes />} />
				<Route
					path="/materias/:materiaId/pastas/:pastaId"
					element={<PastaDetalhes />}
				/>
				<Route path="/estudar" element={<Estudar />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}
