import React from 'react';

const LogIn = (props) => {
  const {name, handleSubmit} = props;
  return (
    <div className='center'>      
    <form onSubmit={handleSubmit} name={name} className='wrapper'>
        <div className='email'>
          <label htmlFor="email"><small>Email</small></label>
          <input
            name="email"
            type="text"
            className="form-control"
            required
          />
        </div>
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
        </div>
        <div>
          <button type="submit" className='btn'>LOG IN</button>
        </div>
      </form>
      <a href="/auth/google">Log in with Google</a>
    </div>
  );
};

export default LogIn;