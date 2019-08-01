import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {firestoreConnect} from 'react-redux-firebase'
import PropTypes from 'prop-types'

class NuevoLibro extends Component {

  state = {
    titulo: '',
    ISBN: '',
    existencias: '',
    prestados: [],
    editorial: ''
  }

  agregarLibro = e => {
    e.preventDefault();

    // tomar copia del state
    const nuevoLibro = this.state;

    // etraer firestor con sus metodos
    const {firestore, history } = this.props;

    // añadirlo a la db y redireccionar
    firestore.add({collection: 'libros'}, nuevoLibro)
      .then(() => history.push('/'))
  }

  // almacena lo que usuario escribe en state
  leerDato = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }




  render() {
    return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left"></i> Volver al listado
        </Link>
      </div>
      <div className="col-12">
        <h2>
          <i className="fas fa-book"></i>{' '} Nuevo Libro
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={this.agregarLibro}>
              <div className="form-group">
                <input type="text" name="titulo" placeholder="Titulo" className="form-control" value={this.state.titulo} onChange={this.leerDato} required />
              </div>

              <div className="form-group">
                <input type="text" name="ISBN" placeholder="ISBN" className="form-control" value={this.state.ISBN} onChange={this.leerDato} required />
              </div>

              <div className="form-group">
                <input type="text" name="editorial" placeholder="Editorial" className="form-control" value={this.state.editorial} onChange={this.leerDato} required />
              </div>

              <div className="form-group">
                <input type="number" min="0" step="1" name="existencias" placeholder="Stock" className="form-control" value={this.state.existencias} onChange={this.leerDato} required />
              </div>
              <input type="submit" value="Guardar en Ebiblos" className="btn btn-success" />
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

NuevoLibro.propTypes = {
  firestore:PropTypes.object.isRequired
}
export default firestoreConnect()(NuevoLibro)
