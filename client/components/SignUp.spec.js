import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import chai, { expect } from 'chai';


import store from '../store';
import connectedSignUp, { SignUp } from './SignUp';
import history from '../history';

function setup() {
  const props = {
    handleSubmit: jest.fn(
      () => {
        console.log('HANDLE_SUBMIT FIRED');
      }),
    error: null,
  };
  const enzymeWrapper = mount(
    <Provider store={store}>
      <Router history={history}>
        <SignUp />
      </Router>
    </Provider>
  );
  return {
    props,
    enzymeWrapper,
  };
}

describe('SignUp', () => {
  it('rendering', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('div.signup').length).to.equal(1);
  });

  it('has 6 inputs: fName, lName, password, rPassword, email, terms', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('input').length).to.equal(6);
    expect(enzymeWrapper.find('#firstName').length).to.equal(1);
    expect(enzymeWrapper.find('#firstName').props()).to.have.property('name', 'first');
    expect(enzymeWrapper.find('#lastName').length).to.equal(1);
    expect(enzymeWrapper.find('#email').length).to.equal(1);
    expect(enzymeWrapper.find('#email').props()).to.have.property('type', 'email');
    expect(enzymeWrapper.find('#password').length).to.equal(1);
    expect(enzymeWrapper.find('#password').props()).to.have.property('type', 'password');
    expect(enzymeWrapper.find('#repassword').length).to.equal(1);
    expect(enzymeWrapper.find('#repassword').props()).to.have.property('type', 'password');
    expect(enzymeWrapper.find('#terms').length).to.equal(1);
  });
});
