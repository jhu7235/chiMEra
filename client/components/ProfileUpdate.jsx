import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';

/**
 * COMPONENT
 */

function ProfileUpdate({ firstName, lastName, email }) {
  return (
    <div className="container">
      <h5>Your Profile</h5>
      <Row>
        <Input s={6} label="First Name" defaultValue={firstName} />
        <Input s={6} label="Last Name" defaultValue={lastName} />
        <Input s={6} label="Email" defaultValue={email} />
      </Row>
      <Row>
        <Button s={4} waves="light">Update Profile</Button>
      </Row>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
  };
};

export default connect(mapState, null)(ProfileUpdate);

/**
 * PROP TYPES
 */
ProfileUpdate.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

