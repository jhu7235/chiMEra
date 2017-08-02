import React from 'react';
import { connect } from 'react-redux';
import { Collection, Row, CollectionItem, Button, Collapsible, CollapsibleItem } from 'react-materialize';
import { changeAdminStatus, destroyUser } from '../../store/users';

function Users({ users, enableAdmin, deleteUser }) {
  return (
    <Collection>
      <Row>
        <CollectionItem>
          <Collapsible>
            {
              users.map((user) => {
                return (<CollapsibleItem
                  header={`${user.firstName} ${user.lastName}`}
                  key={user.id}> Email: {user.email}
                  <Button waves="light" disabled={user.adminStatus} onClick={event => enableAdmin(event, user.id)}>Make Admin</Button>
                  <Button waves="red" onClick={event => deleteUser(event, user.id)}>Delete</Button>
                </CollapsibleItem>);
              })
            }
          </Collapsible>
        </CollectionItem>
      </Row>
    </Collection>
  );
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    enableAdmin(event, id) {
      event.preventDefault();
      dispatch(changeAdminStatus(id));
    },
    deleteUser(event, id) {
      event.preventDefault();
      dispatch(destroyUser(id));
    }
  }
}

export default connect(mapState, mapDispatch)(Users);
