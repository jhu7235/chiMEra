import React from 'react';
import { Button, Icon } from 'react-materialize';
import { connect } from 'react-redux';

function Cart(props) {
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
            {
              props.cart.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{props.enhancements.find(enhancement => enhancement.id === item.enhancementId).name}</td>
                    <td>{props.animals.find(animal => animal.id === item.animalId).name}</td>
                    <td>Unit Price</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td><button>Delete</button></td>
                  </tr>
                );
              })
            }
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

const mapState = (state) => {
  return {
    cart: state.cart,
    enhancements: state.enhancements,
    animals: state.animals,
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
