import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize'

function Admin(props) {
  return (
    <div className="container center">
      <div className="row">
        <h3>Hello {props.firstName} {props.lastName}</h3>
        <h5>Get to work!</h5>
      </div>
      <h5>Edit:</h5>
      <div className="row">
        <Button waves='light'>animals</Button>
        <Button waves='light'>enhancements</Button>
        <Button waves='light'>users</Button>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
  };
};


export default connect(mapState, null)(Admin);
