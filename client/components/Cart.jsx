import React from 'react';
import { Button, Icon } from 'react-materialize';

export default function Cart() {
  return (
    <div className="container">
      <div className="row center">
        <h3>Cart</h3>
      </div>
      <div className="row">
        <table className="highlight">
          <thead>
            <tr>
              <th>Enhancement</th>
              <th>Pet</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Item Total</th>
              <th>Remove buttons</th>
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
      </div>
      <div className="row">
        <div className="col s6"><h3>Total: 3 fity</h3></div>
        <div className="col s6">
	        <Button waves="light">Purchase<Icon right>hot_tub</Icon></Button>
        </div>
      </div>
    </div>
  );
}

//    <div className="container">
//      <div className="row">
//        <div className="col s6"><PetCard /></div>
//      <div className="col s6"><EnhancementCard /></div>
//  </div>
// </div>
