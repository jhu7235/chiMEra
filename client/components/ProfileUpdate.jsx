import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';
import { updateProfile } from '../store/user';

/**
 * COMPONENT
 */

function ProfileUpdate({ firstName, lastName, email, onUpdateSubmit }) {
  return (
    <div className="container">
      <h5>Your Profile</h5>
      <form onSubmit={(event) => {
        event.preventDefault();
        const firstNameSubmission = event.target.firstName.value;
        const lastNameSubmission = event.target.lastName.value;
        const emailSubmission = event.target.email.value;
        onUpdateSubmit(firstNameSubmission, lastNameSubmission, emailSubmission);
      }}
      >
        <Row>
          <Input s={6} name="firstName" label="First Name" defaultValue={firstName} />
          <Input s={6} name="lastName" label="Last Name" defaultValue={lastName} />
          <Input s={6} name="email" label="Email" defaultValue={email} />
        </Row>
        <Row>
          <Button
            waves="light"
            className="submit"
            type="submit"
          >Update Profile</Button>
        </Row>
      </form>
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

const mapDispatch = dispatch => ({
  onUpdateSubmit: (firstName, lastName, email) => dispatch(updateProfile(firstName, lastName, email)),
});

export default connect(mapState, mapDispatch)(ProfileUpdate);

/**
 * PROP TYPES
 */
ProfileUpdate.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

