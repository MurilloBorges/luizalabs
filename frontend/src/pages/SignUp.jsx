import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import IconSVG from '../components/Ui/IconSVG';
import api from '../services/api';
import { login } from '../services/authentication';
import { isEmpty } from '../helpers/funcoes';

export default function SignUp({ history }) {
  const [signUp, setSignUp] = useState({
    nome: '',
    email: '',
    senha: '',
  })

  useEffect(() => {
    toast.configure();
  }, []);

  function handleInput({ currentTarget: { value, name } }) {
    setSignUp({
      ...signUp,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty(signUp.nome) || isEmpty(signUp.email) || isEmpty(signUp.senha)) {
      return toast.error('Todos os campos são obrigatórios.');
    }
    try {
      await api.post('/usuarios', {
        nome: signUp.nome,
        email: signUp.email,
        senha: signUp.senha
      }).then((res) => {
        toast.success('Usuário cadastrado com sucesso!');
        login(res.data.token);
        history.push('/busca-cep');
      }).catch((error) => {
        if (error.response.status === 400) {
          toast.info(error.response.data.error);
        }
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
        <input type="text" autoFocus data-cy="nome" name="nome"
          placeholder="Digite seu nome"
          value={signUp.nome}
          onChange={handleInput}
        />
        <input type="text" data-cy="email" name="email"
          placeholder="Digite seu e-mail"
          value={signUp.email}
          onChange={handleInput}
        />
        <input type="password" data-cy="senha" name="senha"
          placeholder="Digite sua senha"
          value={signUp.senha}
          onChange={handleInput}
        />
        <button type="submit" className="btn btn-info" data-cy="cadastrar">Cadastrar</button>
        <button type="button" className="btn btn-light" data-cy="login" onClick={() => history.push('/login')}>
          LOGIN
        </button>
      </form>
    </div>
  );
}