/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { isEmpty } from '../helpers/funcoes';
import IconSVG from '../components/Ui/IconSVG';
import api from '../services/api';
import { login } from '../services/authentication';

const loading = (payload) => ({
  type: 'LOADER', payload,
});

export default function Login({ history }) {
  const dispatch = useDispatch();
  const [authenticate, setAuthenticate] = useState({
    email: '',
    senha: '',
  });

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
      return toast.error('Preencha o e-mail e a senha para continuar.');
    }
    try {
      dispatch(loading({ loading: true }));
      await api.post('/authenticate', { email: authenticate.email, senha: authenticate.senha }).then((res) => {
        login(res.data.token);
        history.push('/busca-cep');
      }).catch((error) => {
        if ([400, 404].includes(error.response.status)) {
          toast.info(error.response.data.error);
        }
      }).finally(() => {
        dispatch(loading({ loading: false }));
      });
    } catch (error) {
      toast.error(`Falha na requisição: ${error}`);
    }
    return true;
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
        <input
          type="text"
          autoFocus
          data-cy="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={authenticate.email}
          onChange={handleInput}
        />
        <input
          type="password"
          data-cy="senha"
          name="senha"
          placeholder="Digite sua senha"
          value={authenticate.senha}
          onChange={handleInput}
        />
        <button type="submit" className="btn btn-info" data-cy="entrar">Entrar</button>
        <button type="button" className="btn btn-light" data-cy="cadastrar" onClick={() => history.push('/sign-up')}>
          CADASTRAR
        </button>
      </form>
    </div>
  );
}
