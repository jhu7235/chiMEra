import React from 'react';
import { Row, Input } from 'react-materialize';

class AddToCartCard extends React.Component {
  constructor() {
    super()

    this.state = {
      quantity: 1
    }

    this.quantitySelect = this.quantitySelect.bind(this);
  }

  quantitySelect(e) {
    this.setState({ quantity: +e.target.value })
  }

  render() {
    const { selectedPet, selectedEnhancement } = this.props;
    return (
      <div>
        <h5>A pet, but better!</h5>
        <div id="add-to-cart-card">
          <div>
            <img
              width="100" {/* should be abstracted into css */}
              src={selectedPet.imageUrl}
            />
            <img
              width="100"
              src={selectedEnhancement.imageUrl}
            />
          </div>
          <div>
            <h5>{selectedPet.name} with a {selectedEnhancement.name} enhancement</h5>
            <div id="quantity-selector">
              <label display="inline" htmlFor="quantity">Quantity: </label>
              <Row>
                <Input s={12} type='select' onChange={this.quantitySelect}>
                  {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      return <option key={num} value={num}>{num}</option>
                    })
                  }
                </Input>
              </Row>
              <p>${+selectedPet.price + +selectedEnhancement.price} each</p> {/* why are the prices not already numbers? */}
            </div>
          </div>
          <div>
            <p>Total: ${this.state.quantity * (+selectedPet.price + +selectedEnhancement.price) }</p>
            <button className="btn waves-effect waves-light" type="submit" name="action">
              Add to Cart
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddToCartCard;
