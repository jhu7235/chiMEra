import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Row, Input } from 'react-materialize';
import { connect } from 'react-redux';
import { removeItem, updateCartItem } from '../store/cart';

// ********
// Helper Functions

function constructQuantityArray(animal, enhancement) {
  let length;
  if (animal.inventory > enhancement.inventory) {
    length = enhancement.inventory;
  } else {
    length = animal.inventory;
  }
  if (length > 10) length = 10;
  const result = [];
  for (let i = 1; i <= length; i++) {
    result.push(i);
  }
  return result;
}

// ********

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.quantityUpdate = this.quantityUpdate.bind(this);
  }

  quantityUpdate(e, cartItemId) {
    e.preventDefault();
    const quantity = e.target.value;
    this.props.updateQuantity({ cartItemId, quantity })
  }

  render() {
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
              </tr>
            </thead>

            <tbody>
              {
                this.props.cart.map((item) => {
                  const itemEnhancement = this.props.enhancements.find(enhancement =>
                    enhancement.id === item.enhancementId);
                  const itemAnimal = this.props.animals.find(animal => animal.id === item.animalId);
                  return (
                    <tr key={item.id}>
                      <td>{itemEnhancement.name}</td>
                      <td>{itemAnimal.name}</td>
                      <td>{+itemEnhancement.price + +itemAnimal.price}</td>
                      <td id="quantity-edit">
                        <Input type='select' defaultValue={item.quantity} onChange={e => this.quantityUpdate(e, item.id)}>
                          {
                            constructQuantityArray(itemAnimal, itemEnhancement).map((num) => {
                              return <option key={num} value={num}>{num}</option>
                            })
                          }
                        </Input>
                      </td>
                      <td>{
                        item.quantity * (+itemEnhancement.price + +itemAnimal.price)
                      }</td>
                      <td><Button
                        onClick={() => this.props.onDelete(item.id)}
                        floating
                        className="red"
                        waves="light"
                        icon="delete"
                      /></td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col s6"><h3>Total: ${
            this.props.cart.reduce((sum, item) => sum + +item.price, 0)
          }</h3></div>
          <div className="col s6">
            <Link to="/purchase"><Button waves="light">Purchase<Icon right>hot_tub</Icon></Button></Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  cart: state.cart,
  enhancements: state.enhancements,
  animals: state.animals,
});

const mapDispatch = dispatch => ({
  onDelete: id => dispatch(removeItem(id)),
  updateQuantity: (cartItemId, newQuantity) => dispatch(updateCartItem(cartItemId, newQuantity)),
});


export default connect(mapState, mapDispatch)(Cart);
