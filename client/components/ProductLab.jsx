import React from 'react';
import { connect } from 'react-redux';
import PetCard from './PetCard.jsx';
import EnhancementCard from './EnhancementCard.jsx';
import AddToCartCard from './AddToCart.jsx';
import { createItem } from '../store/cart';

class ProductLab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPet: {},
      selectedEnhancement: {},
      showEnhancements: false,
      showAddToCart: false,
    };

    this.handlePetSelect = this.handlePetSelect.bind(this);
    this.handleEnhanceSelect = this.handleEnhanceSelect.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const selectedPet = newProps.animals.find(animal => animal.id === 1) || {};
    const selectedEnhancement = newProps.enhancements.find(enhancement => enhancement.id === 1) || {};
    this.setState({ selectedPet, selectedEnhancement });
  }

  handlePetSelect(e) {
    const selectedPet = this.props.animals.find(animal => animal.id === +e.target.value)
    this.setState({ selectedPet, showEnhancements: true });
  }

  handleEnhanceSelect(e) {
    const selectedEnhancement = this.props.enhancements.find(enhancement => enhancement.id === +e.target.value)
    this.setState({ selectedEnhancement, showAddToCart: true });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <PetCard animals={this.props.animals}
              handlePetSelect={this.handlePetSelect}
              selectedPet={this.state.selectedPet}
            />
          </div>
          { this.state.showEnhancements ?
            <div className="col s6" >
              <EnhancementCard
                enhancements={this.props.enhancements}
                handleEnhanceSelect={this.handleEnhanceSelect}
                selectedEnhancement={this.state.selectedEnhancement}
              />
            </div> :
            null
          }
          { this.state.showAddToCart ?
            <div className="col s12">
              <AddToCartCard
                selectedPet={this.state.selectedPet}
                selectedEnhancement={this.state.selectedEnhancement}
              />
            </div> :
            null
          }
        </div>
        <div className="row center">
          <img className="center" id="centerpaw" src='/big_paw_red.png'></img>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    animals: state.animals,
    enhancements: state.enhancements,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem() {
      // quantity, totalprice, animalId, enhanceId, userId, cartId

      dispatch(createItem());
    }
  }
}

export default connect(mapState, mapDispatch)(ProductLab);
