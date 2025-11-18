import mulherImg from '../assets/Mulher_viverbem.png';
import './home.css';
export default function Home() {
  return (
    <div className="geral">
      <div className="texto">
        <h2>VIVER BEM</h2>
        <p>Bem vindo ao sistema de senhas da VivaBem</p>

        <button>Gerar Senha</button>
      </div>

      <div className="imagem">
        <img src={mulherImg} alt="Médico sorrindo" />
      </div>
    </div>
  );
}

