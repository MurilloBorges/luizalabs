import React from 'react';
import { useSelector } from 'react-redux';
import Router from './routes';
import IconSVG from './components/Ui/IconSVG';

function App() {
  const loading = useSelector((store) => store.loading);

  return (
    <div className="App">
      <Router />
      {loading && (
        <div className="spinner" data-cy="spinner">
          <IconSVG
            className="loader"
            icon="spinner"
            height="10rem"
            width="10rem"
            fill="#3498db"
          />
        </div>
      )}
    </div>
  );
}

export default App;
