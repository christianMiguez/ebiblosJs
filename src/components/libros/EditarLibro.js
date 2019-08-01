import React, { Component } from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from './../layout/Spinner'

class EditarLibro extends Component {
  // refs
  tituloInput = React.createRef();
  editorialInput = React.createRef();
  existenciasInput = React.createRef();
  ISBNInput = React.createRef();

  actualizarLibro = e => {
    e.preventDefault();

    // construir el nuevo objeto para actualzarlo
    const libroActualizado = {
      titulo : this.tituloInput.current.value,
      ISBN : this.ISBNInput.current.value,
      editorial : this.editorialInput.current.value,
      existencias : this.existenciasInput.current.value
    }
    // leer firestore y histoy
    const {firestore, history, libro} = this.props;

    // actualizar en firestore
    firestore.update({
      collection: "libros",
      doc: libro.id
    }, libroActualizado).then(history.push('/'))
  }


  render() {
    const {libro} = this.props;
    if(!libro) return <Spinner />
    return (
      <div className="col-md-12">
        <h4>Editar → <strong>{libro.titulo}</strong> </h4>
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={this.actualizarLibro}>
            <div className="form-group">
                <input type="text" name="titulo" placeholder="Titulo" className="form-control" defaultValue={libro.titulo} ref={this.tituloInput} required />
              </div>

              <div className="form-group">
                <input type="text" name="ISBN" placeholder="ISBN" className="form-control" defaultValue={libro.ISBN} ref={this.ISBNInput} required />
              </div>

              <div className="form-group">
                <input type="text" name="editorial" placeholder="Editorial" className="form-control" defaultValue={libro.editorial} ref={this.editorialInput} required />
              </div>

              <div className="form-group">
                <input type="number" min="0" step="1" name="existencias" placeholder="Stock" className="form-control" defaultValue={libro.existencias} ref={this.existenciasInput} required />
              </div>
              <input type="submit" value="Editar libro" className="btn btn-success" />
            </form>
          </div>
        </div>
      </div>

    );
  }
}


EditarLibro.propTypes = {
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
)(EditarLibro)
