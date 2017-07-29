import React from 'react';
import { Collection, CollectionItem, Row, Input } from 'react-materialize';
import ProductCard from './ProductCard.jsx';

export default function PetCard({ animals, handlePetSelect, selectedPet }) {
  return (
    <Collection>
      <CollectionItem><h5>Step 1: Pick a Pet</h5></CollectionItem>
      <CollectionItem>
        <Row>
          <Input s={12} type='select' onChange={handlePetSelect} defaultValue="0">
            <option disabled value="0" >Choose a pet...</option>
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
