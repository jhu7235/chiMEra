import React from 'react';
import { Collection, CollectionItem, Row, Input, Button, Icon } from 'react-materialize';
import ProductCard from './ProductCard.jsx';

export default function EnhancementCard({ enhancements, handleEnhanceSelect, selectedEnhancement, allEnhancementTags, selectedEnhancementTags, handleEnhancementFilter, removeFilter }) {
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
