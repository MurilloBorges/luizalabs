import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { logout } from '../services/authentication';
import MaskedInput from 'react-text-mask';
import { cepMask } from '../helpers/masks';

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

  async function handleInput({ currentTarget: { value, name } }) {
    setEndereco({
      ...endereco,
      [name]: value,
    });

    if (name === 'cep') {
      try {
        const cep = value.replace(/\D/g, '');
        if (cep.length === 8) {
          await api.get(`/ceps/${cep}`).then((res) => {
            if (res.status === 200) {
              setEndereco({
                ...endereco,
                ...res.data,
              });
            }
          }).catch((error) => {
            console.log(error.response);
            if ([400, 401, 404].includes(error.response.status)) {
              toast.info(error.response.data.error);
            }
          });
        }
      } catch (e) {
        toast.error(`Falha na requisição: ${e}`);
      }
    }
  }

  return (
    <div className="operacoes-produto-container">
      <form>
        <Link to='/login' onClick={logout} className="btn btn-info" data-cy="btn-deslogar" id="deslogar">Deslogar</Link>
        <h1>Buscar CEP</h1>
        <hr />
        <div className="form-row">
          <div className="form-group col-md-3">
            <label for="cep">CEP</label>
            <MaskedInput mask={cepMask} id="cep" guide={false} type="text" name="cep" value={endereco.cep} onChange={handleInput} className="form-control" />
          </div>
          <div className="form-group col-md-7">
            <label for="cidade">Cidade</label>
            <input type="text" className="form-control" id="cidade" value={endereco.city} disabled />
          </div>
          <div className="form-group col-md-2">
            <label for="estado">Estado</label>
            <input type="text" className="form-control" id="estado" value={endereco.state} disabled />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-7">
            <label for="logradouro">Logradouro</label>
            <input type="text" className="form-control" id="logradouro" value={endereco.street} disabled />
          </div>
          <div className="form-group col-md-5">
            <label for="bairro">Bairro</label>
            <input type="text" className="form-control" id="bairro" value={endereco.neighborhood} disabled />
          </div>
        </div>
      </form>
    </div>
  );
}