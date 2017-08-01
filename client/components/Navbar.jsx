import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Dropdown, Chip } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/user';


function Navibar(props) {
  const user = props.currentUser;

  return (
    <div>
      <Navbar brand="ChiMEra" right>
        <li><NavLink to="/about">About </NavLink></li>
        <li><NavLink to="/contact">Contact Us</NavLink></li>
        <li><NavLink to="/cart">Cart <Chip>{props.cartItems}</Chip></NavLink></li>
        <Dropdown trigger={
          <NavItem>{ user.firstName || 'Login/Signup'}</NavItem>
        }>
          {
            props.isLoggedIn ?
              <div>
                {
                  props.isAdmin ?
                    <div>
                      <li><NavLink to="/admin">AdminPage</NavLink></li>
                    </div> : null
                }
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/order-history">Order History</NavLink></li>
                <li><NavLink to="/" onClick={props.logout}>Log Out</NavLink></li>
              </div> :
              <div>
                <li><NavLink to="/signup">Sign Up</NavLink></li>
                <li><NavLink to="/login">Log In</NavLink></li>
              </div>
          }
        </Dropdown>
      </Navbar>
    </div>
  )
}


const mapStateToProps = state => ({
  currentUser: state.user,
  cartItems: state.cart.length,
  isLoggedIn: !!state.user.id,
  isAdmin: state.user.adminStatus,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navibar);
