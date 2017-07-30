import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPastOrders } from '../store/pastOrders';
// #1 get data from server
// #2 map data to show

class PreviousCarts extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div className="row center">
        <div className="col s12 m12 l11">
          <div className="card">
            <div className="card-image">
              <img alt="" src="https://pbs.twimg.com/profile_images/745743929753112587/czNblDjm.jpg" />
              <span className="card-title">Card Title</span>
            </div>
            <div className="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    pastOrders: 'placeholder' || state.pastOrders
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchPastOrders());
    },
  };
};

export default connect(mapState, mapDispatch)(PreviousCarts);

/**
 * PROP TYPES
 */
PreviousCarts.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
