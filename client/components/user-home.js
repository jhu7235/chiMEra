import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';

/**
 * COMPONENT
 */

export default function UserHome() {
  return (
    <div>
      <h5>Hello!</h5>
    </div>
  )
}



// const UserHome = ({ firstName, lastName, email }) => {
//   return (
//     <h5>Hello!</h5>
//   );
// };

// export default UserHome;

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     firstName: state.user.firstName,
//     lastName: state.user.lastName,
//     email: state.user.email,
//   }
// }

// export default connect(mapState, null)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }

{/* <div className="container">
      <h5>Your Profile</h5>
      <Row>
        <Input s={6} label="First Name" />
        <Input s={6} label="Last Name" />
        <Input s={6} label="Email" />
      </Row>
      <Row>
        <Button s={4} waves="light">Update Profile</Button>
      </Row>
    </div> */}
