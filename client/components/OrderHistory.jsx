import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon } from 'react-materialize';
import { fetchPastOrders } from '../store/pastOrders';


class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pastOrders: [] };
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { pastOrders } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row center">
            <h3>Order History</h3>
          </div>
          {
            this.props.pastOrders.map(pastOrder => {
              return (
                <div className="row center" key={pastOrder.id}>
                  <div className="col s12 m12 l11">
                    <div className="card">
                      <span className="card-title">Order# {pastOrder.id}</span>
                      <div className="card-content">
                        <div className="order-row row">
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
                              {pastOrder.pastOrderitems.map((item) => {
                                const itemEnhancement = this.props.enhancements.find(enhancement =>
                                  enhancement.id === item.enhancementId);
                                const itemAnimal = this.props.animals.find(animal => animal.id === item.animalId);
                                return (
                                  <tr key={item.id}>
                                    <td>{itemEnhancement.name}</td>
                                    <td>{itemAnimal.name}</td>
                                    <td>{+itemEnhancement.price + +itemAnimal.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                  </tr>
                                );
                              })}
                              <tr>
                                <td />
                                <td />
                                <td />
                                <td>Total: </td>
                                <td>${pastOrder.pastOrderitems.reduce((sum, item) => sum + +item.price, 0)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
{/*                      <div className="card-action">
                        <a href="#">View Details</a>
                      </div>*/}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div id="pastOrders">
        </div>
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    pastOrders: state.pastOrders,
    animals: state.animals,
    enhancements: state.enhancements,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchPastOrders());
    },
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);

/**
 * PROP TYPES
 */
OrderHistory.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
