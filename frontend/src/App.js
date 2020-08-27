import React from 'react';
import { useSelector } from 'react-redux';
import Router from './routes';

function App() {
  const loading = useSelector((store) => store.loading);

  return (
    <div className="App">
      <Router />
      { loading && (
        <div className="spinner">
          <span className="uk-margin-small-right" uk-spinner="ratio: 2" />
        </div>
      )}
    </div>
  );
}

export default App;
