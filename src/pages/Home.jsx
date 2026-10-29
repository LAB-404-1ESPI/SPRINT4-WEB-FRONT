import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jovixApi } from "../api/mockApi.js";
import {
    ArrowRight,
    BookOpen,
    FolderOpen,
    Layers3,
    Search,
    Sparkles,
} from "lucide-react";
import identificacao from "../assets/imgs/identificacao ia.jpg";
import camera from "../assets/imgs/camera inteligente.jpg";
import galeria from "../assets/imgs/galeria.jpg";
import telaInicial from "../assets/imgs/pagina inicial figma.png";
import cameraFigma from "../assets/imgs/camera inteligente figma.png";
import pastasImg from "../assets/imgs/pasta materias.png";
import buscaImg from "../assets/imgs/busca inteligente.png";
import arthurFoto from "../assets/imgs/arthur.png";
import gustavoFoto from "../assets/imgs/gustavo.jpeg";
import felipeFoto from "../assets/imgs/felipe.jpeg";
import sequeiraFoto from "../assets/imgs/sequeira.jpeg";
import cunhaFoto from "../assets/imgs/cunha.jpeg";

const teamPhotos = {
    "arthur.png": arthurFoto,
    "gustavo.jpeg": gustavoFoto,
    "felipe.jpeg": felipeFoto,
    "sequeira.jpeg": sequeiraFoto,
    "cunha.jpeg": cunhaFoto,
};

const solution = [
    {
        img: identificacao,
        title: "Identificação de conteúdo",
        desc: "Demonstração de como os conteúdos acadêmicos podem ser identificados e separados por matéria.",
    },
    {
        img: camera,
        title: "Registro de materiais",
        desc: "Exemplo visual de registro de conteúdos para manter suas referências acadêmicas organizadas.",
    },
    {
        img: galeria,
        title: "Biblioteca organizada",
        desc: "Uma estrutura visual para separar materiais, assuntos e disciplinas.",
    },
];

const gallery = [
    { img: telaInicial, title: "Tela inicial" },
    { img: cameraFigma, title: "Registro de conteúdo" },
    { img: pastasImg, title: "Pastas por matéria" },
    { img: buscaImg, title: "Busca inteligente" },
];

export default function Home() {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        jovixApi.listarEquipe().then(setTeam);
    }, []);

    return (
        <main>
            <section className="hero-grid relative overflow-hidden">
                <div className="absolute -right-28 top-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[100px]" />
                <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 text-xs font-bold tracking-widest text-jovix-cyan">
                            <Sparkles size={15} /> ORGANIZAÇÃO INTELIGENTE
                        </span>
                        <h1 className="mt-7 text-5xl font-extrabold leading-[1.08] sm:text-6xl">
                            Seus estudos <span className="text-jovix-cyan">organizados.</span>
                            <br />
                            Seu aprendizado potencializado.
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            O JOVIX é uma biblioteca acadêmica que ajuda você a organizar matérias,
                            pastas e materiais em um só lugar.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/app" className="btn-primary">
                                Acessar plataforma <ArrowRight size={18} />
                            </Link>
                            <a href="#sessao1" className="btn-secondary">
                                Conheça a solução
                            </a>
                        </div>
                        <p className="mt-5 text-xs text-slate-500">
                            Versão demonstrativa com dados simulados.
                        </p>
                    </div>

                    <div className="panel glow rounded-[28px] p-5 sm:p-7">
                        <div className="flex items-center justify-between border-b border-white/10 pb-5">
                            <div>
                                <p className="text-xs font-bold tracking-widest text-jovix-cyan">
                                    BIBLIOTECA ACADÊMICA
                                </p>
                                <h2 className="mt-2 text-2xl font-bold">Tudo no seu lugar.</h2>
                            </div>
                            <span className="grid size-12 place-items-center rounded-2xl bg-cyan-400/10 text-jovix-cyan">
                                <BookOpen size={25} />
                            </span>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-white/[.045] p-4">
                                <FolderOpen className="text-jovix-cyan" />
                                <p className="mt-4 text-2xl font-extrabold">Matérias</p>
                                <p className="mt-1 text-xs text-slate-400">Disciplinas organizadas</p>
                            </div>
                            <div className="rounded-2xl bg-white/[.045] p-4">
                                <Layers3 className="text-jovix-cyan" />
                                <p className="mt-4 text-2xl font-extrabold">Pastas</p>
                                <p className="mt-1 text-xs text-slate-400">Assuntos separados</p>
                            </div>
                        </div>
                        <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-[#06132e] p-4">
                            <div className="flex items-center gap-3">
                                <Search className="text-jovix-cyan" />
                                <div>
                                    <p className="font-bold">Encontre rapidamente</p>
                                    <p className="text-sm text-slate-400">
                                        Pesquise por matéria, pasta ou conteúdo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="sessao1"
                className="scroll-mt-24 mx-auto max-w-[1400px] px-6 py-20 lg:px-12"
            >
                <SectionTitle
                    number="01"
                    title="A Solução"
                    subtitle="Inteligência para organizar sua rotina de estudos."
                />
                <p className="mb-9 max-w-3xl text-slate-300">
                    A <b className="text-jovix-cyan">IA JOVIX</b> nasceu para facilitar a organização
                    dos materiais acadêmicos, reunindo conteúdos que normalmente ficam espalhados
                    entre fotos, arquivos e anotações.
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                    {solution.map((x) => (
                        <article className="feature-card" key={x.title}>
                            <img src={x.img} alt={x.title} />
                            <h3>{x.title}</h3>
                            <p>{x.desc}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                id="sessao2"
                className="scroll-mt-24 border-y border-cyan-400/10 bg-[#071633] py-20"
            >
                <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                    <SectionTitle
                        number="02"
                        title="Público-Alvo"
                        subtitle="Feito para quem quer estudar com mais organização."
                    />
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                n: "01",
                                t: "Estudantes full-time",
                                d: "Alunos que acompanham aulas e precisam manter os materiais organizados.",
                            },
                            {
                                n: "02",
                                t: "Universitários",
                                d: "Quem registra conteúdos de diferentes disciplinas durante a semana.",
                            },
                            {
                                n: "03",
                                t: "Alunos do ensino médio",
                                d: "Estudantes que revisam conteúdos e se preparam para provas e vestibulares.",
                            },
                            {
                                n: "04",
                                t: "Estudantes digitais",
                                d: "Quem utiliza o celular e arquivos digitais como apoio para estudar.",
                            },
                        ].map((x) => (
                            <div className="panel rounded-2xl p-6" key={x.n}>
                                <span className="text-3xl font-extrabold text-jovix-cyan">{x.n}</span>
                                <h3 className="mt-4 text-lg font-bold">{x.t}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-400">{x.d}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 rounded-2xl border border-cyan-400/25 bg-[#04112b] p-7">
                        <p className="text-xs font-bold tracking-widest text-jovix-cyan">PERSONA</p>
                        <h3 className="mt-2 text-xl font-bold">Júlio Almeida, 19 anos</h3>
                        <p className="mt-2 max-w-3xl leading-7 text-slate-300">
                            Universitário que registra conteúdos durante as aulas, mas acaba perdendo
                            tempo procurando anotações e imagens quando precisa revisar para uma prova.
                        </p>
                    </div>
                </div>
            </section>

            <section
                id="sessao3"
                className="scroll-mt-24 mx-auto max-w-[1400px] px-6 py-20 lg:px-12"
            >
                <SectionTitle
                    number="03"
                    title="Galeria"
                    subtitle="Conheça as telas e a proposta visual do JOVIX."
                />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {gallery.map((x) => (
                        <article className="gallery-card" key={x.title}>
                            <img src={x.img} alt={x.title} />
                            <h3>{x.title}</h3>
                        </article>
                    ))}
                </div>
            </section>

            <section
                id="sessao4"
                className="scroll-mt-24 border-y border-cyan-400/10 bg-[#071633] py-20"
            >
                <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                    <SectionTitle
                        number="04"
                        title="Nossa Equipe"
                        subtitle="Os integrantes do grupo LAB-404."
                    />
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                        {team.map((x) => (
                            <article className="team-card" key={x.id}>
                                <img src={teamPhotos[x.foto]} alt={x.nome} />
                                <h3>{x.nome}</h3>
                                <p>{x.funcao}</p>
                                <span>RM {x.rm}</span>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="sessao5"
                className="scroll-mt-24 mx-auto max-w-[1400px] px-6 py-20 lg:px-12"
            >
                <SectionTitle
                    number="05"
                    title="Contato"
                    subtitle="Fale com a equipe do JOVIX."
                />
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="panel rounded-2xl p-7">
                        <p className="text-xs font-bold tracking-widest text-jovix-cyan">E-MAIL</p>
                        <a
                            className="mt-3 block text-xl font-bold hover:text-jovix-cyan"
                            href="mailto:contato@iajovix.com"
                        >
                            contato@iajovix.com
                        </a>
                    </div>
                    <div className="panel rounded-2xl p-7">
                        <p className="text-xs font-bold tracking-widest text-jovix-cyan">
                            INSTITUIÇÃO
                        </p>
                        <p className="mt-3 text-xl font-bold">FIAP — Engenharia de Software</p>
                        <p className="mt-1 text-sm text-slate-400">Turma 1ESPI • Grupo LAB-404</p>
                    </div>
                </div>
                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-extrabold">Organize. Encontre. Aprenda.</h2>
                    <Link to="/app" className="btn-primary mt-6">
                        Explorar o JOVIX <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
}

function SectionTitle({ number, title, subtitle }) {
    return (
        <div className="mb-8">
            <p className="text-sm font-extrabold tracking-[.22em] text-jovix-cyan">
                {number} / JOVIX
            </p>
            <h2 className="mt-2 text-4xl font-extrabold">{title}</h2>
            <p className="mt-3 text-lg text-slate-400">{subtitle}</p>
        </div>
    );
}
