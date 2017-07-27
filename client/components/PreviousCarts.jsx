import React from 'react';
import { connect } from 'react-redux';


function PreviousCarts() {
  return (
    <div>
      <h1>Placeholder</h1>
    </div>
  )
}

const mapState = (state) => {
  return {
    previousCarts: 'placeholder' || state.carts.filters(cart => cart.status === 'pending'),
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(PreviousCarts);
