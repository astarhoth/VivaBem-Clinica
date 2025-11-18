
import Home from './pages/home.jsx';
import Header from './components/Header.jsx';
import './components/Header.css';
import SelecionarSenha from "./pages/SelecionarSenha/selecionarSenha";

export default function App() {

  const handleSelecionar = (tipo) => {
    console.log("Tipo selecionado:", tipo);
    // ações aqui
  };

  return (
    <>
      <Header />
      <Home />

      {/* Agora o componente está no lugar certo */}
      <SelecionarSenha onSelecionar={handleSelecionar} />
    </>
  );
}
