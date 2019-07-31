import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <a className="navbar-brand" href="#top">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={'/'} className="nav-link">Libros</Link>
            </li>

            <li className="nav-item dropdown">
              <Link  to={'/suscriptores'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Suscriptores
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={'/suscriptores/mostrar/1'} className="dropdown-item">Mostrar</Link>
                <Link to={'/suscriptores/nuevo/'} className="dropdown-item">Nuevo</Link>
                <div className="dropdown-divider"></div>
                <Link to={'/suscriptores/editar/1'} className="dropdown-item">Editar</Link>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#top" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar
