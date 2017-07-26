import React from 'react';
import { connect } from 'react-redux';
import PetCard from './PetCard.jsx';
import EnhancementCard from './EnhancementCard.jsx';
import AddToCartCard from './AddToCart.jsx';

class ProductLab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPet: {},
      selectedEnhancement: {},
    };

    this.handlePetSelect = this.handlePetSelect.bind(this);
    this.handleEnhanceSelect = this.handleEnhanceSelect.bind(this);
  }

  handlePetSelect(e) {
    const selectedPet = this.props.animals.find(animal => animal.id === +e.target.value)
    this.setState({ selectedPet })
  }

  handleEnhanceSelect(e) {
    this.setState({ selectedEnhancement: e.target.value })
  }

  render() {
    console.log('Current selected Pet', this.state.selectedPet)
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <PetCard animals={this.props.animals}
              handlePetSelect={this.handlePetSelect}
              selectedPet={this.state.selectedPet}
            />
          </div>
          { Object.keys(this.state.selectedPet).length ?
            <div className="col s6">
              <EnhancementCard
                enhancements={this.props.enhancements}
                handleEnhanceSelect={this.handleEnhanceSelect}
                selectedEnhancement={this.state.selectedEnhancement}
              />
            </div> :
            null
          }
          { Object.keys(this.state.selectedEnhancement).length ?
            <div className="col s12">
              <AddToCartCard
                selectedPet={this.state.selectedPet}
                selectedEnhancement={this.state.selectedEnhancement}
              />
            </div> :
            null
          }
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

const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProductLab);
