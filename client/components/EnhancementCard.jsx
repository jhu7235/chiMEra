import React from 'react';
import { Collection, CollectionItem, Row, Input } from 'react-materialize';
import ProductCard from './ProductCard.jsx';

export default function EnhancementCard({ enhancements, handleEnhanceSelect, selectedEnhancement }) {
  return (
    <Collection>
      <CollectionItem><h5>Step 2: Pick an Enhancement</h5></CollectionItem>
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
