import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { logout} from '../../action/auth'
import PropType from 'prop-types'
 
const Navbar = ({ logout, auth: { isAuthendicated ,loading} }) => {
  const authlinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <i className="fas fa-user"></i>{" "}
        <Link to="/dashboard">
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a href="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">LogOut</span>
        </a>
      </li>
    </ul>
  );
  const guestlinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
        
      </h1>
      {isAuthendicated && !loading ? authlinks : guestlinks}
    </nav>
  );
};

Navbar.prototype={
  logout:PropType.func.isRequired
}

const mapStateToProp = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProp, { logout })(Navbar);
