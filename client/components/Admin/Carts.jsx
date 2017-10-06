import React from 'react';
import { connect } from 'react-redux';
import { Row, Table } from 'react-materialize';
import { fetchCarts } from '../../store/carts';

class Carts extends React.Component{
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div className="container">
        {this.props.carts.map((cart)=> {
          return (
            <Row key={cart.id}>
              <h5>Order# {cart.id}</h5>
              <Table className="highlight">
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
                    cart.cartItems.map((item) => {
                      const itemEnhancement = this.props.enhancements.find(enhancement =>
                        enhancement.id === item.enhancementId);
                      const itemAnimal = this.props.animals.find(animal => animal.id === item.animalId);
                      return (
                        <tr key={item.id}>
                          <td>{itemEnhancement.name}</td>
                          <td>{itemAnimal.name}</td>
                          <td>{+itemEnhancement.price + +itemAnimal.price}</td>
                          <td>{+item.quantity}</td>
                          <td>{item.quantity * (+itemEnhancement.price + +itemAnimal.price)}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
              <div className="row">
                <div className="col s11"><p>Total: ${
                  cart.cartItems.reduce((sum, item) => sum + +item.price, 0)
                }</p></div>
              </div>
            </Row>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    carts: state.carts,
    animals: state.animals,
    enhancements: state.enhancements,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchCarts());
    },
  };
};

export default connect(mapState, mapDispatch)(Carts);
