import React from 'react';
import { connect } from 'react-redux';
import PetCard from './PetCard.jsx';
import EnhancementCard from './EnhancementCard.jsx';
import AddToCartCard from './AddToCart.jsx';
import { createItem } from '../store/cart';

// Helper Functions

function categoryFilter(productArr, categoryArr) {
  return arr.filter(element => element.tags.includes(category));
}

class ProductLab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPet: {},
      selectedEnhancement: {},
      showEnhancements: false,
      showAddToCart: false,
    };

    this.initialState = {};

    this.handlePetSelect = this.handlePetSelect.bind(this);
    this.handleEnhanceSelect = this.handleEnhanceSelect.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  filterPetResults(product) {
    return categoryFilter(this.props.animals, this.state.petCategory)
  }

  handlePetSelect(e) {
    const selectedPet = this.props.animals.find(animal => animal.id === +e.target.value)
    this.setState({ selectedPet, showEnhancements: true });
  }

  handleEnhanceSelect(e) {
    const selectedEnhancement = this.props.enhancements.find(enhancement => enhancement.id === +e.target.value)
    this.setState({ selectedEnhancement, showAddToCart: true });
  }

  handleAddItem({ quantity, price, animalId, enhancementId }) {
    this.props.addItem({ quantity, price, animalId, enhancementId })
      .then(() => this.setState({ selectedEnhancement: {}, selectedPet: {}, showAddToCart: false, showEnhancements: false }));
  }

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <PetCard animals={this.props.animals}
              handlePetSelect={this.handlePetSelect}
              selectedPet={this.state.selectedPet}
              animalTags={this.props.animalTags}
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
                addItem={this.handleAddItem}
                history={this.props.history}
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
  console.log('STATE: ', state)
  return {
    animals: state.animals,
    enhancements: state.enhancements,
    animalTags: state.animalTags,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem: ({ quantity, price, animalId, enhancementId }) => {
      return dispatch(createItem({ quantity, price, animalId, enhancementId }));
    },
  };
};

export default connect(mapState, mapDispatch)(ProductLab);
