
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/iajovix.png";

const sections = [
  { href: "/#sessao1", label: "A Solução" },
  { href: "/#sessao2", label: "Público-Alvo" },
  { href: "/#sessao3", label: "Galeria" },
  { href: "/#sessao4", label: "Nossa Equipe" },
  { href: "/#sessao5", label: "Contato" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`jovix-header sticky top-0 z-50 ${
          scrolled ? "header-scrolled" : "header-top"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-10 transition-all duration-300 ${
            scrolled ? "h-[68px]" : "h-[90px]"
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <img
              src={logo}
              alt="Logo JOVIX"
              className={`rounded-full object-cover transition-all duration-300 ${
                scrolled ? "h-12 w-12" : "h-14 w-14"
              }`}
            />

            <span className="text-3xl font-extrabold tracking-tight">
              IA <span className="text-jovix-cyan">Jovix</span>
            </span>
          </Link>

          <button
            className={`hamburger ${open ? "is-open" : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div
          className={`menu-screen ${scrolled ? "menu-scrolled" : "menu-top"}`}
          role="dialog"
          aria-label="Menu principal"
        >
          <button
            className="menu-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            ×
          </button>

          <nav className="menu-list">
            <p className="eyebrow mb-5">NAVEGAÇÃO</p>

            {sections.map((x, i) => (
              <a
                key={x.href}
                href={x.href}
                onClick={() => setOpen(false)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {x.label}
              </a>
            ))}

            <div className="my-5 h-px bg-cyan-400/20" />

            <Link to="/app" onClick={() => setOpen(false)}>
              <span>06</span>
              Painel do estudante
            </Link>

            <Link to="/materias" onClick={() => setOpen(false)}>
              <span>07</span>
              Biblioteca de matérias
            </Link>

            <Link to="/estudar" onClick={() => setOpen(false)}>
              <span>08</span>
              Buscar materiais
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
