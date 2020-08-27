import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Pages
// import Home from '../pages/home/index';
import Error from '../pages/404';

export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/404" exact>
          <Error />
        </Route>

        {/* Home 
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>*/}

        {/* Página not found */}
        <Route path="*" exact>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
