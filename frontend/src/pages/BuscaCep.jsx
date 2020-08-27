import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import IconSVG from '../components/Ui/IconSVG';
import api from '../services/api';
import { isEmpty } from '../helpers/funcoes';
import { logout } from '../services/authentication';

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
    <div className="operacoes-produto-container">
      <form onSubmit={handleSubmit}>
        <Link to='/login' onClick={logout} className="btn btn-info" data-cy="btn-deslogar" id="deslogar">Deslogar</Link>
        <h1>Buscar CEP</h1>
        <hr />
        <h4>Nome</h4>
        <input type="text" autoFocus placeholder="Digite o nome" data-cy="input-nome"
          value={endereco.neighborhood} onChange={handleInput}
        />
        <h4>Descrição</h4>
        <input type="text" placeholder="Digite a descrição" data-cy="input-descricao"
          value={endereco.street} onChange={handleInput}
        />
        <h4>Valor</h4>
        <input type="text" maxLength="9" placeholder="0,00" data-cy="input-valor"
          value={endereco.state} onChange={handleInput}
        />
        <div className="operacoes-produto-frames">
          <Link to='/produtos' className="btn btn-danger"
            id="cancelar" data-cy="btn-cancelar">Cancelar
          </Link>
          <button type="submit" className="btn btn-success"
            id="salvar" data-cy="btn-salvar" onClick={handleSubmit}>Salvar
          </button>
        </div>
      </form>
    </div>
  );
}