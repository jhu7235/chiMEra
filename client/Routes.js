
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import SignUp from './components/SignUp.jsx';
import { fetchAnimals } from './store/animals';
import { fetchEnhancements } from './store/enhancements';
import { fetchCart } from './store/cart';
import { fetchAnimalTags } from './store/animalTags';
import { fetchEnhancementTags } from './store/enhancementTags';
import history from './history';
import { Main } from './components/index.jsx';
import { me } from './store';
import LogIn from './components/LogIn.jsx';
import ProductLab from './components/ProductLab.jsx';
import Cart from './components/Cart.jsx';
import PurchaseForm from './components/PurchaseForm.jsx';
import ProfileUpdate from './components/ProfileUpdate.jsx';
import Admin from './components/Admin/Admin.jsx';
import PastOrders from './components/PastOrders.jsx';
import Loading from './components/Loading.jsx';
import Reviews from './components/Reviews.jsx'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {

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
            <Route path="/reviews" component={Reviews} />
            <Route exact path="/" component={ProductLab} />
            {
              isLoggedIn ?
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/profile" component={ProfileUpdate} />
                  <Route path="/order-history" component={PastOrders} />
                  <Route path="/admin" component={Admin} />
                </Switch> : null
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Loading} />
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
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchAnimals());
      dispatch(fetchEnhancements());
      dispatch(fetchCart());
      dispatch(fetchAnimalTags());
      dispatch(fetchEnhancementTags());
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
