import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import IconSVG from '../components/Ui/IconSVG';
import api from '../services/api';
import { isEmpty } from '../helpers/funcoes';

export default function BuscaCep({ history }) {
  const [endereco, setEndereco] = useState({    
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',    
  })

  useEffect(() => {
    toast.configure();
  }, []);

  function handleInput({ currentTarget: { value, name } }) {
    setEndereco({
      ...endereco,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty(endereco.nome) || isEmpty(endereco.email) || isEmpty(endereco.senha)) {
      return toast.error('Todos os campos são obrigatórios.');
    }
    try {
      await api.post(`/ceps/${endereco.cep}`).then((res) => {        
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
        <input type="text" autoFocus data-cy="cep" name="nome"
          placeholder="Digite seu nome"
          value={endereco.nome}
          onChange={handleInput}
        />
        <input type="text" autoFocus data-cy="email" name="email"
          placeholder="Digite seu e-mail"
          value={endereco.email}
          onChange={handleInput}
        />
        <input type="password" data-cy="senha" name="senha"
          placeholder="Digite sua senha"
          value={endereco.senha}
          onChange={handleInput}
        />
        <button type="submit" className="btn btn-info" data-cy="cadastrar">Cadastrar</button>
        <button type="button" className="btn btn-light" data-cy="login" onClick={() => history.push('/login')}>
          Login
        </button>
      </form>
    </div>
  );
}