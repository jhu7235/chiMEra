import React from 'react';
import { Collection, CollectionItem, Row, Input, Button, Icon, Dropdown, NavItem } from 'react-materialize';
import ProductCard from './ProductCard.jsx';

class PetCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userText: "",
      dirty: false,
    };

    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSearchText(e) {
    this.setState({ userText: e.target.value, dirty: true })
  }

  handleSelection(e) {
    this.props.handlePetSelect(e);
    this.setState({ userText: '', dirty: false });
  }

  render() {
    const { animals, handlePetSelect, selectedPet, animalTags, handlePetFilter, petTags, removeFilter } = this.props;
    const searchAnimals = animals.filter(animal => animal.name.toLowerCase().match(this.state.userText.toLowerCase()));
    return (
      <Collection>
        <CollectionItem><h5>Step 1: Pick a Pet</h5></CollectionItem>
        <CollectionItem>
          <Row>
            <Input s={12} type='select' onChange={e => handlePetFilter(e, 'petTags')} defaultValue="0">
              <option disabled value="0" >Filter based on category...</option>
              {
                animalTags.map((tag) => {
                  return <option key={tag.id} value={tag.id}>{tag.tagName}</option>
                })
              }
            </Input>
          </Row>
          <Row>
            {
              petTags.map(tag => <Button onClick={() => removeFilter(tag.id, 'petTags')} key={tag.id} waves='teal'>{tag.tagName}<Icon right >close</Icon></Button>)
            }
          </Row>
        </CollectionItem>
        <CollectionItem>
          <Row>
            <Input s={12} type="text" placeholder="Search by name" onChange={this.handleSearchText} value={this.state.userText} />
            {
              this.state.dirty && this.state.userText.length ?
                searchAnimals.length ?
                  <Collection className="search-matches">
                    {
                      searchAnimals.map((animal) => {
                        return (
                          <CollectionItem key={animal.id}>
                            <Button flat onClick={this.handleSelection} value={animal.id}>
                              {animal.name.toLowerCase()}
                            </Button>
                          </CollectionItem>
                        );
                      })
                    }
                  </Collection> : <Collection><CollectionItem>No matches</CollectionItem></Collection> : null
            }
          </Row>
        </CollectionItem>
        <CollectionItem>
          <Row>
            <Input s={12} type='select' onChange={this.handleSelection} defaultValue="0">
              <option disabled value="0" >Or choose from a list...</option>
              {
                animals.map((animal) => {
                  return <option key={animal.id} value={animal.id}>{animal.name}</option>
                })
              }
            </Input>
          </Row>
        </CollectionItem>
        {
          selectedPet.id ?
            <CollectionItem>
              <ProductCard product={selectedPet} />
            </CollectionItem> :
            <CollectionItem className="placeholder-card"></CollectionItem>
        }
      </Collection>
    );
  }
}


export default PetCard;
