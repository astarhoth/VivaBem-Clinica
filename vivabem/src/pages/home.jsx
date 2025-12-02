import mulherImg from '../assets/Mulher_viverbem.png';
import { Link } from "react-router-dom";
import './home.css';
export default function Home() {
  return (
    <><div className="geral">
      <div className="texto">
        <h2>VIVER BEM</h2>
        <p>Bem-vindo ao sistema de senhas da Viva Bem. <br /> Aqui você encontra mais organização,menos filas e <br /> um atendimento muito mais tranquilo.</p>
      </div>

      <div className="imagem">
        <img src={mulherImg} alt="Médico sorrindo" />
      </div>
    </div>
    <div className="final">
        <div className="bloco">
          <h2>Gerar Senha</h2>
          <p>Pegar uma senha clique aqui </p>
          <Link to="/selecionar-senha"><button>Gerar senha</button></Link>
        </div>
         <div className="bloco">
          <h2>Chamar Paciente</h2>
          <p>Veja os historico de senhas</p>
          <Link to="/chamar-paciente"><button>Chamar paciente</button></Link>
        </div>
         <div className="bloco">
          <h2>Recepcionista</h2>
          <p>Mostrar senha para chamar o paciente</p>
          <Link to="/senha-recepcionista"><button>Painel Recepcionista</button></Link>
        </div>
      </div></>
  );
}