import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../store';

const PurchaseForm = (props) => {
  const { handleSubmit, error } = props;
  return (
      <Row>
          <Input placeholder="Placeholder" s={6} label="First Name" />
          <Input s={6} label="Last Name" />
          <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
          <Input type="password" label="password" s={12} />
          <Input type="email" label="Email" s={12} />
      </Row>
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
