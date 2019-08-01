import React, { Component, Fragment } from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from './../layout/Spinner'
import FichaSuscriptor from '../suscriptores/FichaSuscriptor'
// REDUX
import {buscarUsuario} from '../../actions/buscarUsuarioActions'

class PrestamoLibro extends Component {
  state = {
    busqueda: '',
    noResults: false
  }

  // buscar almuno
  buscarAlumno = e => {
    e.preventDefault();

    // obtener el valor a buscar
    const {busqueda} = this.state;

    // extraer firestore
    const {firestore, buscarUsuario} = this.props;

    // hacer la consulta
    const coleccion = firestore.collection('suscriptores');
    const consulta = coleccion.where("codigo", "==", busqueda).get();

    // leer los resultados
    consulta.then(resultado => {
      if(resultado.empty) {
        // no hay resultados

        // almacenar en redux un objeto vacio
        buscarUsuario({})
        this.setState({
          noResults: true
        })
      } else {
        // si hay resultados

        // colocar el resultado en redux
        const datos = resultado.docs[0];
        buscarUsuario(datos.data())


        // actualiza state en base si hay resultados o no
        this.setState({
          noResults: false
        })
      }
    })
  }

  // almacena los datos del alumno para solicitar libro

  solicitarPrestamo = () => {
    const {usuario} = this.props;

    // fecha de prestamo
    usuario.fecha_solicitud = new Date().toLocaleDateString();

    // no se puede mutar props, hay que crear una copia
    let prestados = [];

    prestados = [...this.props.libro.prestados, usuario]

   // copiar objeto y agregar prestados
   const libro = {...this.props.libro};

   delete libro.prestados;

   libro.prestados = prestados;

   const {firestore, history} = this.props;

   firestore.update({
     collection: 'libros',
     doc: libro.id
   }, libro).then(history.push('/'));

  }

  leerDato = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {

    // extraer libro
    const {libro} = this.props;

    if (!libro) return <Spinner />

    // extraer datos del alumno
    const {usuario} = this.props;

    let fichaAlumno, btnSolicitar;
    if(usuario.nombre) {
      fichaAlumno = <FichaSuscriptor alumno={usuario} />
      btnSolicitar = <button type="button" className="btn btn-primary btn-block" onClick={this.solicitarPrestamo}>Confirmar Prestamo</button>
    } else {
      fichaAlumno = null;
      btnSolicitar = null;
    }
  const {noResults} = this.state;
    let mensajeResultado = '';

    if(noResults) {
      mensajeResultado = <div className="alert alert-danger">
        No hay resultados pa este codigo che
      </div>
    } else {
      mensajeResultado = null
    }

    return (
      <Fragment>
        <div className="row">
          <div className="col-md-12">
          <h6 className="text-center">Solicitar prestamo → <strong>{libro.titulo}</strong> </h6>
          </div>
        </div>

        <hr/>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={this.buscarAlumno} className="mb-4">
              <legend className="color-primary text-center">Buscar alumno por código</legend>
              <div className="form-group">
                <input type="text" name="busqueda" className="form-control" placeholder='Ej: "1550"' onChange={this.leerDato} />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-info btn-block">Buscar alumno</button>
              </div>
            </form>
            {/* Muestra ficha del alumno y boton solicitar prestamo */}
            {fichaAlumno}
            {btnSolicitar}

            {mensajeResultado}
          </div>
        </div>
      </Fragment>
      );
  }
}

PrestamoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [{
    collection: 'libros',
    storeAs: 'libro',
    doc: props.match.params.id
  }]), connect(({ firestore: {ordered}, usuario}, props) => ({
    libro: ordered.libro && ordered.libro[0],
    usuario: usuario
  }), {buscarUsuario})
)(PrestamoLibro)

