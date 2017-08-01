import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon } from 'react-materialize';
import { fetchReviews } from '../store/reviews';


class Reviews extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row center">
            <h3>Product Review</h3>
          </div>
          <div className="row center">
            <div className="col s12 m12 l11">
              <div className="card">
                <div className="card-content">
                  <div className="order-row row">
                    <table className="highlight">
                      <thead>
                        <tr>
                          <th>Enhancement</th>
                          <th>Pet</th>
                          <th>Rating</th>
                          <th>Description</th>
                          <th>User</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.props.reviews.map((review) => {
                          const reviewEnhancement = this.props.enhancements.find(enhancement =>
                            enhancement.id === review.enhancementId) || { name: 'loading enhancements' };
                          const reviewAnimal = this.props.animals.find(animal => animal.id === review.animalId) || { name: 'loading animals' };
                          return (
                            <tr key={review.id}>
                              <td>{reviewEnhancement.name}</td>
                              <td>{reviewAnimal.name}</td>
                              <td>{review.rating}</td>
                              <td>{review.inspiredEmotion}</td>
                              <td>{review.fullDescription}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    reviews: state.reviews,
    animals: state.animals,
    enhancements: state.enhancements,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchReviews());
    },
  };
};

export default connect(mapState, mapDispatch)(Reviews);

/**
 * PROP TYPES
 */
Reviews.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
