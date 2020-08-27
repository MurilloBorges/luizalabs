import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import IconSVG from '../components/Ui/IconSVG';
import api from '../services/api';
import { login } from '../services/authentication';
import { isEmpty } from '../helpers/funcoes';
import { Redirect } from 'react-router-dom';

export default function Login({ history }) {
  const [authenticate, setAuthenticate] = useState({
    email: '',
    senha: '',
  })

  useEffect(() => {
    toast.configure();
  }, []);

  function handleInput({ currentTarget: { value, name } }) {
    setAuthenticate({
      ...authenticate,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty(authenticate.email) || isEmpty(authenticate.senha)) {
      return toast.error('Preencha e-mail e senha para continuar.');
    }
    try {
      await api.post('/authenticate', { email: authenticate.email, senha: authenticate.senha }).then((res) => {
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
          height="10rem"
          width="10rem"
          fill="#666666"
        />
        <input type="text" autoFocus data-cy="email" name="email"
          placeholder="Digite seu e-mail"
          value={authenticate.email}
          onChange={handleInput}
        />
        <input type="password" data-cy="senha" name="senha"
          placeholder="Digite sua senha"
          value={authenticate.senha}
          onChange={handleInput}
        />
        <button type="submit" className="btn btn-info" data-cy="entrar">Entrar</button>
        <button type="button" className="btn btn-light" data-cy="cadastrar" onClick={() => history.push('/sign-up')}>
          CADASTRAR
        </button>
      </form>
    </div >
  );
}