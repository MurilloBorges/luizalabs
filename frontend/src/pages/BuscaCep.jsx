/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { logout } from '../services/authentication';
import { cepMask } from '../helpers/masks';

const loading = (payload) => ({
  type: 'LOADER', payload,
});

export default function BuscaCep() {
  const dispatch = useDispatch();
  const [endereco, setEndereco] = useState({
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
  });

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
          document.activeElement.blur();
          dispatch(loading({ loading: true }));
          await api.get(`/ceps/${cep}`).then((res) => {
            if (res.status === 200) {
              setEndereco({
                ...endereco,
                ...res.data,
              });
            }
          }).catch((error) => {
            if ([400, 401, 404].includes(error.response.status)) {
              toast.info(error.response.data.error);
              setEndereco({
                ...endereco,
                cep: error.response.data.cep,
                state: '',
                city: '',
                neighborhood: '',
                street: '',
              });
            }
          }).finally(() => {
            dispatch(loading({ loading: false }));
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
        <Link to="/login" onClick={logout} className="btn btn-info" data-cy="deslogar" id="deslogar">Deslogar</Link>
        <h1>Buscar CEP</h1>
        <hr />
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="cep">CEP</label>
            <MaskedInput
              mask={cepMask}
              id="cep"
              guide={false}
              type="text"
              name="cep"
              value={endereco.cep}
              onChange={handleInput}
              className="form-control"
              data-cy="cep"
            />
          </div>
          <div className="form-group col-md-7">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              className="form-control"
              id="cidade"
              value={endereco.city}
              disabled
              data-cy="cidade"
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              className="form-control"
              id="estado"
              value={endereco.state}
              disabled
              data-cy="estado"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-7">
            <label htmlFor="logradouro">Logradouro</label>
            <input
              type="text"
              className="form-control"
              id="logradouro"
              value={endereco.street}
              disabled
              data-cy="logradouro"
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              className="form-control"
              id="bairro"
              value={endereco.neighborhood}
              disabled
              data-cy="bairro"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
