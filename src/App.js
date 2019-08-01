import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux'

import Suscriptores from './components/suscriptores/Suscriptores'
import MostrarSuscriptor from './components/suscriptores/MostrarSuscriptor'
import EditarSuscriptor from './components/suscriptores/EditarSuscriptor'
import NuevoSuscriptor from './components/suscriptores/NuevoSuscriptor'
import NavBar from './components/layout/NavBar'
import Libros from './components/libros/Libros';
import MostrarLibro from './components/libros/MostrarLibro';
import EditarLibro from './components/libros/EditarLibro';
import NuevoLibro from './components/libros/NuevoLibro';
import PrestamoLibro from './components/libros/PrestamoLibro';
import Login from './components/auth/Login';

import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={UserIsAuthenticated(Libros)}></Route>
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)}></Route>
            <Route exact path="/libros/mostrar/:id" component={UserIsAuthenticated(MostrarLibro)}></Route>
            <Route exact path="/libros/nuevo/" component={UserIsAuthenticated(NuevoLibro)}></Route>
            <Route exact path="/libros/editar/:id" component={UserIsAuthenticated(EditarLibro)}></Route>
            <Route exact path="/libros/prestamo/:id" component={UserIsAuthenticated(PrestamoLibro)}></Route>

            <Route exact path="/suscriptores" component={Suscriptores}></Route>
            <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)}></Route>
            <Route exact path="/suscriptores/mostrar/:id" component={UserIsAuthenticated(MostrarSuscriptor)}></Route>
            <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
