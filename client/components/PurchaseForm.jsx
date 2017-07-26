import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../store';
import { Row, Input, Button } from 'react-materialize';

const PurchaseForm = (props) => {
  return (
    <div className="container">
      <h5>Shipping Address</h5>
      <Row>
        <Input s={12} label="Address" />
        <Input s={6} label="City" />
        <Input s={2} label="State" />
        <Input s={4} label="Zipcode" />
      </Row>
      <h5>Credit Card</h5>
      <Row>
        <Input s={12} label="Number" />
        <Input s={6} label="Expiration" />
        <Input s={3} label="CSV" />
      </Row>
      <h5>Billing Address</h5>
      <Row>
        <Input s={12} label="Address" />
        <Input s={6} label="City" />
        <Input s={2} label="State" />
        <Input s={4} label="Zipcode" />
      </Row>
      <Row>
        <Input s={8} name='terms' type='checkbox' value='terms' label='I agree with the Terms and Conditions' />
        <Button s={4} waves='light'>Confirm</Button>
      </Row>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    error: state.user.error,
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
      dispatch(signup(email, password, repassword, firstName, lastName));
    },
  };
};

export default connect(mapLogin, mapDispatch)(PurchaseForm);
