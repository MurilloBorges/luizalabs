import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { loader } from './store/ducks';
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import StateLoader from './store/ducks/actions';

const stateLoader = new StateLoader();

const store = createStore(loader, stateLoader.loadState());

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
