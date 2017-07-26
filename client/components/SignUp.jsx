import React from 'react';
import { connect } from 'react-redux';
import {signup} from '../store';

const handleSubmit2 = (event) => {
  event.preventDefault();
  };
  
const SignUp = (props) => {
  const {handleSubmit, error} = props;
  return (
    <div className='center'>
    <form onSubmit={ handleSubmit } className='wrapper'>
        <div className="form-group">
          <div>
            <label htmlFor="first"><small>first</small></label>
            <input
              name="first"
              type="text"
              className="form-control"
              required
            />
          </div>
          <div>
            <label htmlFor="last"><small>last</small></label>
            <input
              name="last"
              type="text"
              className="form-control"
              required
            />
          </div>
        </div>
        <br />
        <div className='email'>
          <label htmlFor="email"><small>Email</small></label>
          <input
            name="email"
            type="text"
            className="form-control"
            required
          />
        </div>
        <br />
        <div className='form-group'>
          <div>
            <label htmlFor="password"><small>Password</small></label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
            />
            </div>
            <div>
            <label htmlFor="re-password"><small>Re-Enter Password</small></label>
            <input
              name="repassword"
              type="password"
              className="form-control"
              required
            />
          </div>
        </div>
        <br />
        {error && error.response && <div className='errorMessage'> {error.response.data} </div>}
        {error.passwordMismatch && <div className='errorMessage' id="passwordMismatch"> {error.response.data} </div>}
        <label><input type="checkbox" name="terms" /> I agree with the <a href="#">Terms and Conditions</a>.</label>
        <div>
          <button type="submit" className='btn'>SIGN UP</button>
        </div>
      </form>
      <a href="/auth/google">Sign up with Google</a>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    error: state.user.error
  };
};


const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const firstName = event.target.first.value;
      const lastName = event.target.last.value;
      const email = event.target.email.value;
      const password = event.target.password.value;    
      const repassword = event.target.repassword.value;
      dispatch(signup(email, password, repassword, firstName, lastName)); //need to add first name and last name
    },
  };
};

export default connect( mapLogin, mapDispatch)(SignUp);
