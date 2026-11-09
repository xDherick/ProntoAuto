import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService.js';

// Tela de Login (RF22): acesso seguro e isolamento de dados entre oficinas (RNF05).
export default function LoginPage() {
  const navigate = useNavigate();
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      await login(identificador, senha);
      navigate('/');
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={entrar}>
        <h1>Pronto<span>Auto</span></h1>
        <input
          type="text"
          placeholder="E-mail ou CNPJ"
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {erro && <p className="error" style={{ color: '#ffb4ab' }}>{erro}</p>}
        <button className="btn" type="submit" disabled={carregando}>
          {carregando ? 'ENTRANDO...' : 'ENTRAR'}
        </button>
        <a href="#recuperar">Esqueci minha senha</a>
      </form>
    </div>
  );
}
