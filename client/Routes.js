// please respect your style guide
import { fetchAnimals } from './store/animals';
import { fetchEnhancements } from './store/enhancements';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import {Main } from './components';
import {me} from './store';

// all these components should be being exported from one central file in the
// components folder (check the index file there) - the idea is so that we can aoivd making
// a ton of imports here like below
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx';
import ProductLab from './components/ProductLab.jsx';
import Cart from './components/Cart.jsx';
import PurchaseForm from './components/PurchaseForm.jsx';
import UserHome from './components/user-home';
import ProfileUpdate from './components/ProfileUpdate.jsx';
import PreviousCarts from './components/PreviousCarts.jsx';

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData();
  }

  render () {

    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/cart" component={Cart} />
            <Route path="/purchase" component={PurchaseForm} />
            <Route exact path="/" component={ProductLab} />
            {
              isLoggedIn ?
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/profile" component={ProfileUpdate} />
                  <Route path="/orders" component={PreviousCarts} />
                </Switch> : null
            }
            {/* Displays our Login component as a fallback */}
            <Route component={LogIn} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchAnimals());
      dispatch(fetchEnhancements());
      dispatch(me());
    }
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
