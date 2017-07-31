import React from 'react';
import { connect } from 'react-redux';
import PetCard from './PetCard.jsx';
import EnhancementCard from './EnhancementCard.jsx';
import AddToCartCard from './AddToCart.jsx';
import { createItem } from '../store/cart';

// ******
// Helper Functions

function categoryFilter(productArr, selectedTagArr) {
  return productArr.filter((product) => {
    return selectedTagArr.every(selectedTag => {
      return product.tags.findIndex(petTag => petTag.id === selectedTag.id) !== -1;
    });
  });
}

// ******

class ProductLab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPet: {},
      selectedEnhancement: {},
      petTags: [],
      showEnhancements: false,
      showAddToCart: false,
    };

    this.initialState = {};

    this.handlePetSelect = this.handlePetSelect.bind(this);
    this.handleEnhanceSelect = this.handleEnhanceSelect.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.filterPetResults = this.filterPetResults.bind(this);
    this.handlePetFilter = this.handlePetFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  filterPetResults(product) {
    return categoryFilter(this.props.animals, this.state.petCategory)
  }

  removeFilter(tagId) {
    const removalIdx = this.state.petTags.findIndex(tag => tag.id === tagId);
    let updatedPetTags = this.state.petTags.slice(0, removalIdx) + this.state.petTags.slice(removalIdx + 1);
    if (updatedPetTags) updatedPetTags = [];
    this.setState({ petTags: updatedPetTags });
  }

  handlePetFilter(e) {
    const newPetTag = this.props.animalTags.find(tag => tag.id === +e.target.value);
    if (this.state.petTags.findIndex(petTag => petTag.id === newPetTag.id) === -1) {
      this.setState(prevState => ({ petTags: [...prevState.petTags, newPetTag] }));
    }
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
    const filteredAnimals = categoryFilter(this.props.animals, this.state.petTags);
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <PetCard
              animals={filteredAnimals}
              handlePetSelect={this.handlePetSelect}
              selectedPet={this.state.selectedPet}
              animalTags={this.props.animalTags}
              handlePetFilter={this.handlePetFilter}
              petTags={this.state.petTags}
              removeFilter={this.removeFilter}
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

