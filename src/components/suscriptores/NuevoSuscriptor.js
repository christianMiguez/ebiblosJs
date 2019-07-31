import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {firestoreConnect} from 'react-redux-firebase'
import PropTypes from 'prop-types'

export class NuevoSuscriptor extends Component {

  state = {
    nombre: '',
    apellido: '',
    carrera: '',
    codigo: ''
  }

  // agregar suscriptor a db
  agregarSuscriptor = e => {
    e.preventDefault();

    // extraer valores del state
    const nuevoSuscriptor = this.state

    // utilizar firestore
    const {firestore, history} = this.props

    // guardar en db
    firestore.add({
      collection: 'suscriptores'
    }, nuevoSuscriptor).then(() => history.push('/suscriptores'))
  }

  // extrae los valores del input  y los coloca en el state
  leerDato = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={'/suscriptores'} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i>
            {' '}Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-plus"></i>{' '}
            Nuevo Suscriptor
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.agregarSuscriptor}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre"
                  required
                  onChange={this.leerDato}
                  value={this.state.nombre} />
                </div>
                <div className="form-group">
                  <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  id="apellido"
                  placeholder="Apellido"
                  required
                  onChange={this.leerDato}
                  value={this.state.apellido} />
                </div>
                <div className="form-group">
                  <input
                  type="text"
                  className="form-control"
                  name="carrera"
                  id="carrera"
                  placeholder="Carrera"
                  required
                  onChange={this.leerDato}
                  value={this.state.carrera} />
                </div>
                <div className="form-group">
                  <input
                  type="text"
                  className="form-control"
                  name="codigo"
                  id="codigo"
                  placeholder="Código"
                  required
                  onChange={this.leerDato}
                  value={this.state.codigo} />
                </div>
                <div className="form-group">
                  <input type="submit" value="Guardar" className="btn btn-success btn-block"/>
                </div>
              </form>

              </div>
            </div>
          </div>
        </div>
    )
  }
}

NuevoSuscriptor.propTypes = {
  firestore:PropTypes.object.isRequired
}
export default firestoreConnect()(NuevoSuscriptor)
