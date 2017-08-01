import React from 'react';
import { connect } from 'react-redux';
import Animals from './Animals.jsx';
import Carts from './Carts.jsx';
import Enhancements from './Enhancements.jsx';
import PastOrders from './PastOrders.jsx';
import Users from './Users.jsx';
import { Tabs, Tab } from 'react-materialize';

class Admin extends React.Component {

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {

    return (
      <div className="container center">
        <div className="row">
          <h3>Hello {this.props.firstName} {this.props.lastName}</h3>
          <h5>Get to work!</h5>
        </div>
        <div className="row">
          <Tabs className="tab-demo z-depth-1">
            <Tab title="Animals"><Animals /></Tab>
            <Tab title="Enhancements"><Enhancements /></Tab>
            <Tab title="Users">Users</Tab>
            <Tab title="Carts">Carts</Tab>
            <Tab title="Past Orders">Past Orders</Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchCarts());
      dispatch(fetchPastOrders());
      dispatch(fetchUsers());
    }
  }
}


export default connect(mapState, mapDispatch)(Admin);
