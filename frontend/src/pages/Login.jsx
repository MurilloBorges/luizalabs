import React, { useState } from 'react';
import { toast } from 'react-toastify';
import IconSVG from '../components/Ui/IconSVG';
import api from '../services/api';
import { login } from '../services/authentication';

export default function Login({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  toast.configure();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      return toast.error('Preencha usuário e senha para continuar.');
    }
    try {
      await api.post('/authenticate', {
        username,
        password,
      }).then((res) => {
        login(res.data.token);
        history.push('/busca-cep');
      }).catch((error) => {
        toast.error('Usuário ou Senha Inválido.');
      });
    } catch (e) {
      toast.error(`Falha na requisição: ${e}`);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <IconSVG
          icon="user"
          height="1.5rem"
          width="1.5rem"
          fill="#666666"
        />
        <input type="text" autoFocus data-cy="username"
          placeholder="Digite seu usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input type="password" data-cy="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" data-cy="entrar">Entrar</button>
      </form>
    </div>
  );
}