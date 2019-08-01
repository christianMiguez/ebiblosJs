import React from 'react';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from './../layout/Spinner'

const Libros = ({libros, firestore}) => {

  if(!libros) return <Spinner />

  const eliminarLibros = (id) => {
    // eliminar con firestore
    firestore.delete({
      collection: 'libros',
      doc: id
    })
  }


  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/libros/nuevo" className="btn btn-success">
          <i className="fas fa-plus" aria-hidden="true"></i> Agregar libro
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-book"></i> Libros
        </h2>
      </div>

      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Titulo</th>
            <th>ISBN</th>
            <th>Editorial</th>
            <th>Existencia</th>
            <th>Disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>

          {libros.map(libro => (
            <tr key={libro.id}>
            <td scope="row">{libro.titulo}</td>
            <td>{libro.ISBN}</td>
            <td>{libro.editorial}</td>
            <td>{libro.existencias}</td>
            <td>{libro.existencias - libro.prestados.length}</td>
            <td>
              <Link to={`/libros/mostrar/${libro.id}`} className="btn btn-success"><i className="fa fa-angle-double-right" aria-hidden="true"></i> {' '}Ver info</Link>
                {' '}
              <Link to={`/libros/editar/${libro.id}`} className="btn btn-info"><i className="fa fa-pen" aria-hidden="true"></i></Link>
                {' '}
              <button className="btn btn-danger" onClick={() => eliminarLibros(libro.id)}>
                      <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
              </td>
          </tr>
          ))}


        </tbody>
      </table>

    </div>
  );
}


Libros.propTypes = {
  firestore: PropTypes.object.isRequired,
  libros: PropTypes.array
}

export default compose(
  firestoreConnect([{collection: 'libros'}]),
  connect((state, props) => ({
    libros: state.firestore.ordered.libros
  }))
)(Libros);

