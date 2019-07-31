import React, { Component } from 'react';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from './../layout/Spinner'

class EditarSuscriptor extends Component {

  // refs

  nombreInput = React.createRef();
  apellidoInput = React.createRef();
  carreraInput = React.createRef();
  codigoInput = React.createRef();

  // editar suscriptor en db
  editarSuscriptor = e => {
    e.preventDefault();

    // crear objeto a actualizar
    const suscriptorActualizado = {
      nombre: this.nombreInput.current.value,
      apellido: this.apellidoInput.current.value,
      codigo: this.codigoInput.current.value,
      carrera: this.carreraInput.current.value
    }

    // extraer firestore y history
    const {suscriptor, firestore, history} = this.props
    // almacenar en db de firestore
    firestore.update({
      collection: 'suscriptores',
      doc: suscriptor.id
    }, suscriptorActualizado).then(() => history.push('/suscriptores'))
  }

  render() {

    const {suscriptor} = this.props;

    if(!suscriptor) return <Spinner />

    return (
      <div className="col-md-12">
      <h4>Editar → <strong>{suscriptor.nombre}</strong> </h4>
      <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.editarSuscriptor}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre"
                  required
                  ref={this.nombreInput}
                  defaultValue={suscriptor.nombre} />
                </div>
                <div className="form-group">
                  <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  id="apellido"
                  placeholder="Apellido"
                  required
                  ref={this.apellidoInput}
                  defaultValue={suscriptor.apellido} />
                </div>
                <div className="form-group">
                  <input
                  type="text"
                  className="form-control"
                  name="carrera"
                  id="carrera"
                  placeholder="Carrera"
                  required
                  ref={this.carreraInput}
                  defaultValue={suscriptor.carrera} />
                </div>
                <div className="form-group">
                  <input
                  type="text"
                  className="form-control"
                  name="codigo"
                  id="codigo"
                  placeholder="Código"
                  required
                  ref={this.codigoInput}
                  defaultValue={suscriptor.codigo} />
                </div>
                <div className="form-group">
                  <input type="submit" value="Guardar" className="btn btn-success btn-block"/>
                </div>
              </form>

              </div>
            </div>

      </div>
    );
  }
}

EditarSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [{
    collection: 'suscriptores',
    storeAs: 'suscriptor',
    doc: props.match.params.id
  }]), connect(({ firestore: {ordered}}, props) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(EditarSuscriptor)

