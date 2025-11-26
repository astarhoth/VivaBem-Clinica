import mulherImg from '../assets/Mulher_viverbem.png';
import './home.css';
export default function Home() {
  return (
    <><div className="geral">
      <div className="texto">
        <h2>VIVER BEM</h2>
        <p>Bem vindo ao sistema de senhas da VivaBem</p>

        <button>Gerar Senha</button>
      </div>

      <div className="imagem">
        <img src={mulherImg} alt="Médico sorrindo" />
      </div>
    </div>
    <div className="final">
        <div className="bloco">
          <h2>Painel</h2>
          <h4>pegar uma senha clique aqui </h4>
          <button>Painel</button>
        </div>
         <div className="bloco">
          <h2>Historico</h2>
          <h4>veja os historico de senhas</h4>
          <button>Abrir historico </button>
        </div>
         <div className="bloco">
          <h2>Chamar paciente</h2>
          <h4>mostrar senha para chamar o paciente</h4>
          <button>chamar paciente</button>
        </div>
      </div></>
  );
}