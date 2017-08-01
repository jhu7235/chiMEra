import React from 'react';
import { Collection, CollectionItem, Row, Input, Button, Icon } from 'react-materialize';
import ProductCard from './ProductCard.jsx';

class EnhancementCard extends React.Component {
  constructor(props) {
    super(props)

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
    this.props.handleEnhanceSelect(e);
    this.setState({ userText: '', dirty: false });
  }

  render() {
    const { enhancements, handleEnhanceSelect, selectedEnhancement, allEnhancementTags, selectedEnhancementTags, handleEnhancementFilter, removeFilter } = this.props;
    const searchEnhancements = enhancements.filter(enhancement => enhancement.name.toLowerCase().match(this.state.userText.toLowerCase()));
    return (
      <Collection>
        <CollectionItem><h5>Step 2: Pick an Enhancement</h5></CollectionItem>
        <CollectionItem>
          <Row>
            <Input s={12} type='select' onChange={e => handleEnhancementFilter(e, 'enhancementTags')} defaultValue="0">
              <option disabled value="0" >Filter based on category...</option>
              {
                allEnhancementTags.map((tag) => {
                  return <option key={tag.id} value={tag.id}>{tag.tagName}</option>
                })
              }
            </Input>
          </Row>
          <Row>
            {
              selectedEnhancementTags.map(tag => <Button onClick={() => removeFilter(tag.id, 'enhancementTags')} key={tag.id} waves='teal'>{tag.tagName}<Icon right >close</Icon></Button>)
            }
          </Row>
        </CollectionItem>
        <CollectionItem>
          <Row>
            <Input s={12} type="text" placeholder="Search by name" onChange={this.handleSearchText} value={this.state.userText} />
            {
              this.state.dirty && this.state.userText.length ?
                searchEnhancements.length ?
                  <Collection className="search-matches">
                    {
                      searchEnhancements.map((enhancement) => {
                        return (
                          <CollectionItem key={enhancement.id}>
                            <Button flat onClick={this.handleSelection} value={enhancement.id}>
                              {enhancement.name.toLowerCase()}
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
            <Input s={12} type='select' onChange={handleEnhanceSelect} defaultValue="0">
              <option disabled value="0" >Choose an enhancement...</option>
              {
                enhancements.map((enhancement) => {
                  return <option key={enhancement.id} value={enhancement.id}>{enhancement.name}</option>
                })
              }
            </Input>
          </Row>
        </CollectionItem>
        {
          selectedEnhancement.id ?
            <CollectionItem>
              <ProductCard product={selectedEnhancement} />
            </CollectionItem> :
            <CollectionItem className="placeholder-card"></CollectionItem>
        }
      </Collection>
    );
  }
}

export default EnhancementCard;
