import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { logout } from '../store/user';

function isLoggedIn(user) {
  if (Object.keys(user).length) {
    return true;
  }
  return false;
}

function Navbar(props) {
  let user = props.currentUser;
  return (
    <div>
      <ul id="login" className="dropdown-content">
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signup">SignUp</NavLink></li>
      </ul>
      <ul id="user" className="dropdown-content">
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/logout">Logout</NavLink></li>
      </ul>
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">chiMEra</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/about" >About</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
            <li><NavLink to="/cart" >Cart</NavLink></li>
            {
              isLoggedIn(user) ?
                <li><a className="dropdown-button" href="#!" data-activates="user">{user.firstName} {user.lastName}<i className="material-icons right">arrow_drop_down</i></a></li> :
                <li><a className="dropdown-button" href="#!" data-activates="login">Login/Sign Up<i className="material-icons right">arrow_drop_down</i></a></li>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = state => ({ currentUser: state.user });

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
