import React, { Component } from 'react';
import {firebaseConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';


class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  // iniciar sesion en firebase
  iniciarSesion = e => {
    e.preventDefault();

    // extraer firebase
    const {firebase} = this.props;

    const {email, password} = this.state;

    // autenticar
    firebase.login({
      email,
      password
    }).then(resultado => console.log('iniciado')).catch(error => console.log('Hubo un error'))
  }

  // almacena lo que usuario escribe en state; No tiene sentido usar redux aqui
  leerDatos = e => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card my-5">
            <div className="card-body">
              <h3 className="text-center py-4">
                <i className="fas fa-lock"></i>  <br/>
                Iniciar Sesión</h3>
                <form onSubmit={this.iniciarSesion}>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email" className="form-control" onChange={this.leerDatos} value={this.state.email} required />
                  </div>
                  <div className="form-group">
                    <input type="password" name="password" placeholder="Password" className="form-control" onChange={this.leerDatos} value={this.state.password} required />
                  </div>

                  <input type="submit" value="Autenticarse" className="btn btn-primary btn-block" value="Ingresar"/>


                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login);
