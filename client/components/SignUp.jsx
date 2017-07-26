import React from 'react';

const SignUp = (props) => {
  const {name, handleSubmit} = props;
  return (
    <div className='center'>
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit} name={name} className='wrapper'>
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
              type="text"
              className="form-control"
              required
            />
            </div>
            <div>
            <label htmlFor="re-password"><small>Re-Enter Password</small></label>
            <input
              name="re-password"
              type="text"
              className="form-control"
              required
            />
          </div>
        </div>
        <label><input type="checkbox" name="terms" /> I agree with the <a href="#">Terms and Conditions</a>.</label>
        <div>
          <button type="submit" className='btn'>SIGN UP</button>
        </div>
      </form>
      <a href="/auth/google">Sign up with Google</a>
    </div>
  );
};

export default SignUp;