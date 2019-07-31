import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux'

import Suscriptores from './components/suscriptores/Suscriptores'
import MostrarSuscriptor from './components/suscriptores/MostrarSuscriptor'
import EditarSuscriptor from './components/suscriptores/EditarSuscriptor'
import NuevoSuscriptor from './components/suscriptores/NuevoSuscriptor'
import NavBar from './components/layout/NavBar'


function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/suscriptores" component={Suscriptores}></Route>
            <Route exact path="/suscriptores/nuevo" component={NuevoSuscriptor}></Route>
            <Route exact path="/suscriptores/mostrar/:id" component={MostrarSuscriptor}></Route>
            <Route exact path="/suscriptores/editar/:id" component={EditarSuscriptor}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
