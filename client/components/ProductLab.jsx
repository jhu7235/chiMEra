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
      enhancementTags: [],
      showEnhancements: false,
      showAddToCart: false,
    };

    this.initialState = {
      selectedPet: {},
      selectedEnhancement: {},
      petTags: [],
      enhancementTags: [],
      showEnhancements: false,
      showAddToCart: false,
    };

    this.handlePetSelect = this.handlePetSelect.bind(this);
    this.handleEnhanceSelect = this.handleEnhanceSelect.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  removeFilter(tagId, tagType) {
    const removalIdx = this.state[tagType].findIndex(tag => tag.id === tagId);
    let updatedTags = this.state[tagType].slice(0, removalIdx).concat(this.state[tagType].slice(removalIdx + 1));
    if (!updatedTags) updatedTags = [];
    this.setState({ [tagType]: updatedTags });
  }

  addFilter(e, tagType) {
    let allKey;
    let selectedKey;

    if (tagType === 'petTags') {
      allKey = 'animalTags';
      selectedKey = 'petTags';
    } else if (tagType === 'enhancementTags') {
      allKey = 'allEnhancementTags';
      selectedKey = 'enhancementTags';
    } else {
      throw new Error('Unexpected tag type');
    }

    const newPetTag = this.props[allKey].find(tag => tag.id === +e.target.value);
    if (this.state[selectedKey].findIndex(petTag => petTag.id === newPetTag.id) === -1) {
      this.setState(prevState => ({ [selectedKey]: [...prevState[selectedKey], newPetTag] }));
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
      .then(() => this.setState(this.initialState));
  }

  render() {
    const filteredAnimals = categoryFilter(this.props.animals, this.state.petTags);
    const filteredEnhancements = categoryFilter(this.props.enhancements, this.state.enhancementTags);
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <PetCard
              animals={filteredAnimals}
              handlePetSelect={this.handlePetSelect}
              selectedPet={this.state.selectedPet}
              animalTags={this.props.animalTags}
              petTags={this.state.petTags}
              handlePetFilter={this.addFilter}
              removeFilter={this.removeFilter}
            />
          </div>
          { this.state.showEnhancements ?
            <div className="col s6" >
              <EnhancementCard
                enhancements={filteredEnhancements}
                handleEnhanceSelect={this.handleEnhanceSelect}
                selectedEnhancement={this.state.selectedEnhancement}
                allEnhancementTags={this.props.allEnhancementTags}
                selectedEnhancementTags={this.state.enhancementTags}
                handleEnhancementFilter={this.addFilter}
                removeFilter={this.removeFilter}
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
    allEnhancementTags: state.enhancementTags,
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

