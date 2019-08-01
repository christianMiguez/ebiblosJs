import React, { Component, Fragment} from 'react';
import {Link} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import PropTypes from 'prop-types';

class Navbar extends Component {
  state = {
    usuarioAutenticado: false
  }

  // recibe los props automaticamente
  static getDerivedStateFromProps(props, state) {
    const {auth} = props;

    if(auth.uid) {
      return {usuarioAutenticado : true}
    } else {
      return {usuarioAutenticado : false}
    }
  }

  cerrarSesion = ()=> {
    const {firebase} = this.props;
    firebase.logout()
  }


  render() {

    const {usuarioAutenticado} = this.state;
    // extraer datos de autenticacion
    const {auth} = this.props



    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
          <Link to={'/'} className="navbar-brand"><i className="fas fa-book"></i> {'  '} ebiblos</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {usuarioAutenticado ? (
              <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <Link  to={'/suscriptores'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Suscriptores
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to={'/suscriptores/'} className="dropdown-item">Ver todos</Link>
                  <Link to={'/suscriptores/nuevo/'} className="dropdown-item">Añadir nuevo</Link>
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link  to={'/libros'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Libros
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to={'/'} className="dropdown-item">Ver todos</Link>
                  <Link to={'/libros/nuevo/'} className="dropdown-item">Añadir nuevo</Link>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#top" tabIndex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            ) : null}
            {usuarioAutenticado ? (
                <ul className="navbar-nab ml-auto">
                  <li className="nav-item">
                    <a href="" className="nav-link">{auth.email}</a>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="nav-link btn btn-danger" onClick={this.cerrarSesion}>Cerrar sesion</button>
                  </li>
                </ul>
            ) : null}

            {/* <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder='"El poder del Ahora"' aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
            </form> */}
          </div>
        </nav>
      </Fragment>
    )
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar)
