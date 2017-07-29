import React from 'react';
import { connect } from 'react-redux';


function PreviousCarts() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Item Name</th>
          <th>Item Price</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Alvin</td>
          <td>Eclair</td>
          <td>$0.87</td>
        </tr>
        <tr>
          <td>Alan</td>
          <td>Jellybean</td>
          <td>$3.76</td>
        </tr>
        <tr>
          <td>Jonathan</td>
          <td>Lollipop</td>
          <td>$7.00</td>
        </tr>
      </tbody>
    </table>
  );
}

const mapState = (state) => {
  return {
    previousCarts: 'placeholder' || state.carts.filters(cart => cart.status === 'pending'),
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(PreviousCarts);
