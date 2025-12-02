import { Link } from "react-router-dom";
import logo from '../assets/Logo.png'
import telaPrincipal from '../pages/home.jsx'

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
          <img src={logo} alt="" />
          <h1 className="logo_nome">Viva Bem</h1>   
      </div>


       <nav className="nav">
        <Link to="/selecionar-senha">Gerar senha</Link>
        <Link to="/chamar-paciente">Painel TV</Link>
        <Link to="/senha-recepcionista">Recepcionista</Link>
      </nav> 
    </header>
  );
}
