import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Input, Button, Modal, Icon } from 'react-materialize';
import { fetchReviews, createReview } from '../store/reviews';
import { fetchPastOrders } from '../store/pastOrders';


class WriteReview extends React.Component {

  constructor() {
    super();
    this.state = {
      pastOrderItemSelected: '',
      rating: null,
      reviewText: '',
      emotion: '',
    };
    this.initalstate = {
      pastOrderItemSelected: '',
      rating: null,
      reviewText: '',
      emotion: '',
    };

    this.changeProductHandler = this.changeProductHandler.bind(this);
    this.ratingSelectHandler = this.ratingSelectHandler.bind(this);
    this.emotionSelectHandler = this.emotionSelectHandler.bind(this);
    this.reviewTextHandler = this.reviewTextHandler.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  changeProductHandler(e) {
    this.setState({ pastOrderItemSelected: e.target.value });
  }
  ratingSelectHandler(e) {
    this.setState({ rating: e.target.value });
  }
  emotionSelectHandler(e) {
    this.setState({ emotion: e.target.value });
  }
  reviewTextHandler(e) {
    this.setState({ reviewText: e.target.value });
  }
  submitReview(e) {

    let idArray = this.state.pastOrderItemSelected.split(",")

    let pastOrderItem = idArray[0];
    let reviewAnimal = idArray[1];
    let reviewEnhancement = idArray[2];

    this.props.createNewReview(this.state.rating, this.state.emotion, reviewAnimal, reviewEnhancement, this.props.pastOrders[0].userId, this.state.reviewText);

    this.setState(this.initalstate);
  }

  render() {
    return (
      <div>
        <div className="container center">
          <div className="row">
            <h3>We value your feedback, revolution through evolution</h3>
          </div>
          <Row>
            <Input
              s={12}
              type="select"
              label="Product Select"
              onChange={this.changeProductHandler}
            >
              <option selected disabled>Select one of your previous purchases</option>
              {this.props.pastOrders.map((pastOrder) => {
                return pastOrder.pastOrderItems.map((pastOrderItem) => {
                  let reviewAnimal = this.props.animals.find((animal) => animal.id === pastOrderItem.animalId);
                  let reviewEnhancement = this.props.enhancements.find((enhancement) => enhancement.id === pastOrderItem.enhancementId);
                  let selectString = reviewAnimal.name + ' + ' + reviewEnhancement.name;
                  return <option value={pastOrderItem.id + "," + reviewAnimal.id + "," + reviewEnhancement.id} key={pastOrderItem.id}>{selectString}</option>;
                });
              })}
            </Input>
          </Row>
          <Row>
            {this.state.pastOrderItemSelected ?
              <Modal header="Modal Header" fixedFooter trigger={<Button waves="light">Enter Review Here</Button>}>
                <Row>
                  <Input s={12} type="select" onChange={this.ratingSelectHandler}>
                    <option selected disabled>Rate your product</option>
                    {
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => <option key={num} value={num}>{num}</option>)
                    }
                  </Input>
                </Row>
                <Row>
                  <Input s={12} type="select" onChange={this.emotionSelectHandler}>
                    <option selected disabled>What emotion does your upgraded friend inpsire?</option>
                    {
                      ['brooding', 'fear', 'existential angst', 'qtness overload', 'glee', 'sorrow'].map(emotion => <option key={emotion} value={emotion}>{emotion}</option>)
                    }
                  </Input>
                </Row>
                <Row>
                  <textarea onChange={this.reviewTextHandler} rows="8" cols="70" placeholder="Enter Your Review Here" />
                </Row>
                <Row className="center">
                  <Button onClick={this.submitReview} type="submit" className="center" waves="light">Submit!<Icon right>wb_iridescent</Icon></Button>
                </Row>
              </Modal>
              : <div />}
          </Row>
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
    pastOrders: state.pastOrders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchReviews(''));
      dispatch(fetchPastOrders());
    },
    createNewReview(rating, inspiredEmotion, animalId, enhancementId, userId, fullDescription) { dispatch(createReview({ rating, inspiredEmotion, animalId, enhancementId, userId, fullDescription })); },
  };
};

export default connect(mapState, mapDispatch)(WriteReview);

/**
 * PROP TYPES
 */
WriteReview.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
