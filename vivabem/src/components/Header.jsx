import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">Viva Bem</h1>

      <nav className="nav">
        <Link to="/">Painel</Link>
        <Link to="/selecionar-senha">Gerar senha</Link>
        <Link to="/chamar-paciente">Chamar paciente</Link>
        <Link to="/senha-recepcionista">recepcionista</Link>
      </nav>
    </header>
  );
}
