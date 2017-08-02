import React from 'react';
import { Row, Input, Icon, Collection, CollectionItem, Col } from 'react-materialize';
import { Link } from 'react-router-dom';

class AddToCartCard extends React.Component {
  constructor() {
    super();

    this.state = {
      quantity: 1,
    };

    this.quantitySelect = this.quantitySelect.bind(this);
    this.constructQuantityArray = this.constructQuantityArray.bind(this);
    this.calculateRating = this.calculateRating.bind(this);
  }

  quantitySelect(e) {
    this.setState({ quantity: +e.target.value });
  }

  constructQuantityArray(length) {
    if (!length) {
      if (this.props.selectedPet.inventory > this.props.selectedEnhancement.inventory) {
        length = this.props.selectedEnhancement.inventory;
      } else {
        length = this.props.selectedPet.inventory
      }
      if (length > 10) length = 10;
    }
    const result = [];
    for (let i = 1; i <= length; i++) {
      result.push(i);
    }
    return result;
  }

  calculateRating() {

    if (this.props.reviews.length) {
      const sum = this.props.reviews.reduce((acc, review) => acc + +review.rating, 0);
      const avg = sum / this.props.reviews.length;
      return Math.round(avg);
    }
    return 0;
  }

  render() {
    const { selectedPet, selectedEnhancement, addItem } = this.props;
    return (
      <div className="card-collection">
        <Collection className="card-collection">
          <CollectionItem>
            <Row>
              <Col s={4}>
                <h5>Your chiMEra:</h5>
              </Col>
              <Col s={6}>
                <h5>{selectedPet.name} + {selectedEnhancement.name}</h5>
              </Col>
            </Row>
            <Row>
              <Col s={4}>
                <Row>
                  <Col s={6}>
                    <img
                      width="100%"
                      src={selectedPet.imageUrl}
                    />
                  </Col>
                  <Col s={6}>
                    <img
                      width="100%"
                      src={selectedEnhancement.imageUrl}
                    />
                  </Col>
                </Row>
              </Col>
              <Col s={5}>
                <Row>
                  <Col s={2}>
                    <p display="inline">Rating:</p>
                  </Col>
                  <Col s={5} id="atc-rating-wrapper">
                    {
                      this.calculateRating() ?
                        this.constructQuantityArray(this.calculateRating()).map((num) => {
                          return (
                            <Icon key={num} s={12} tiny>star</Icon>
                          );
                        })
                        : <p>Product not yet rated</p>
                    }
                  </Col>
                  <Col s={4} id="atc-view-ratings-wrapper">
                    {
                      this.calculateRating() ?
                        <Link display="inline" to={`/reviews?animalId=${selectedPet.id}&enhancementId=${selectedEnhancement.id}`} >View Ratings</Link> : null
                    }
                  </Col>
                </Row>
                <Row>
                  <Col s={2}>
                    <p>Quantity: </p>
                  </Col>
                  <Col s={2} id="atc-quantity-wrapper">
                    <Input s={12} type='select' onChange={this.quantitySelect}>
                      {
                        this.constructQuantityArray().map((num) => {
                          return <option key={num} value={num}>{num}</option>
                        })
                      }
                    </Input>
                  </Col>
                  <Col s={4}>
                    <p>${+selectedPet.price + +selectedEnhancement.price} each</p>
                  </Col>
                </Row>
              </Col>
              <Col s={3}>
                <p>Total: ${this.state.quantity * (+selectedPet.price + +selectedEnhancement.price)}</p>
                <button
                  onClick={() => addItem({
                    animalId: selectedPet.id,
                    enhancementId: selectedEnhancement.id,
                    price: (this.state.quantity * (+selectedPet.price + +selectedEnhancement.price)).toFixed(2),
                    quantity: this.state.quantity,
                  })}
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action">
                  Add to Cart
                  <i className="material-icons right">send</i>
                </button>
              </Col>
            </Row>
          </CollectionItem>
        </Collection>
      </div>
    );
  }
}


export default AddToCartCard;
