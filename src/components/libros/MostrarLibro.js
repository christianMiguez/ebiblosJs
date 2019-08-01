import React, { Component } from 'react';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from './../layout/Spinner'

class MostrarLibro extends Component {

  devolverLibro = id => {
    // extraer firetore
    const {firestore} = this.props;

    // copia del libro
    const libroActualizado = {...this.props.libro}

    // eliminar la persona que está realizando la devolución

    const prestados = libroActualizado.prestados.filter(elemento => elemento.codigo !== id);
    libroActualizado.prestados = prestados;

    // actualizar en firebase
    firestore.update({
      collection: 'libros',
      doc: libroActualizado.id
    }, libroActualizado)
  }

    render() {

      const {libro} = this.props;

      if(!libro) return <Spinner />

      let btnPrestamo;

      if(libro.existencias - libro.prestados.length > 0) {
        btnPrestamo = <Link to={`/libros/prestamo/${libro.id}`} className="btn btn-success my-3">Solicitar Prestamo</Link>
      } else {
        btnPrestamo = null;
      }

      return (
        <div className="row">
          <div className="col-md-6 mb-4">
            <Link to="/" className="btn btn-secondary">
              <i className="fas fa-arrow-circle-left"></i>{''}
              &nbsp;&nbsp;
              Volver al Listado
            </Link>
          </div>
          <div className="col-md-6">
            <Link to={`/libros/editar/${libro.id}`} className="btn btn-primary float-right">
              <i className="fas fa-pencil-alt"></i>{''}
              &nbsp;&nbsp;
              Editar Libro
            </Link>
          </div>
          <hr className="mx-5 w-100"/>
          <div className="col-12">
            <h3 className="mb-4">
            {libro.titulo}
            </h3>
            <p>
              <span className="font-weight-bold">
                ISBN:
              </span>&nbsp;
              {libro.ISBN}
            </p>
            <p>
              <span className="font-weight-bold">
                Editorial:
              </span>&nbsp;
              {libro.editorial}
            </p>
            <p>
              <span className="font-weight-bold">
                Existencias:
              </span>&nbsp;
              {libro.existencias}
            </p>
            <p>
              <span className="font-weight-bold">
                Prestados:
              </span>&nbsp;
              {libro.prestados.length}
            </p>

            {btnPrestamo}

            <hr/>

            {/* Muestra las personas que tienen libro */}
            <h5 className="my-3">Prestado a: </h5>
            {libro.prestados.map(prestado => (
              <div key={prestado.codigo} className="card my-4 ">
                <h6 className="card-header font-weight-bold">
                  {prestado.nombre} {prestado.apellido}
                </h6>
                <div className="card-body">
                 <p>
                    <span className="font-weight bold">
                      <strong>Código:</strong> {''}
                      {prestado.codigo}
                    </span>
                  </p>

                  <p>
                    <span className="font-weight bold">
                      <strong>Carrera:</strong> {''}
                      {prestado.carrera}
                    </span>
                  </p>

                  <p>
                    <span className="font-weight bold">
                      <strong>Fecha de prestamo:</strong> {''}
                      {prestado.fecha_solicitud}
                    </span>
                  </p>
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-danger font-weight-bold" onClick={() => this.devolverLibro(prestado.codigo)}>Realizar Devolución</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }

}

MostrarLibro.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [{
    collection: 'libros',
    storeAs: 'libro',
    doc: props.match.params.id
  }]), connect(({ firestore: {ordered}}, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(MostrarLibro)
