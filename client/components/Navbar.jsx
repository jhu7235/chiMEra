import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
  return (
    <div>
      <ul id="login" className="dropdown-content">
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/singup">SignUp</NavLink></li>
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
              false ?
                <li><a className="dropdown-button" href="#!" data-activates="user">[Insert Name]<i className="material-icons right">arrow_drop_down</i></a></li> :
                <li><NavLink to="/login">Sign In</NavLink> or <NavLink to="/signup">Login/Signup</NavLink></li>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;



{/*<i className="material-icons right">arrow_drop_down</i>*/}
