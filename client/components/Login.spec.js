
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';
import history from '../history';
import connectedLogIn, { LogIn } from './Login';


function setup() {

  const props = {
    error: null,
    handleSubmit: jest.fn(
      () => {
        console.log('HANDLE_SUBMIT FIRED')
      }),
  }

  const LogInEW = mount(
    <Provider store={store}>
      <Router history={history}>
        <LogIn {...props}/>
      </Router>
    </Provider>
  )

  return LogInEW
}

describe('LogIn', () => {
  const LogInEW = setup().find('#login');
  it('renders', () => {
    expect(LogInEW.find('#login').length).to.equal(1);
  })

  it('has a form with 2 inputs: email and password', () => {
    expect(LogInEW.find('form').find('input').length).to.equal(2);
    expect(LogInEW.find('form').find('#email').length).to.equal(1);
    expect(LogInEW.find('form').find('#email').props()).to.have.property('type', 'email');
    expect(LogInEW.find('form').find('#password').length).to.equal(1);
    expect(LogInEW.find('form').find('#password').props()).to.have.property('type', 'password');
  });

  it('has a link to sign up', () => {
    expect(LogInEW.find('a').find('button').length).to.equal(1);
  })

})


