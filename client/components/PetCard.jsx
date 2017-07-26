import React from 'react';
import { Collection, CollectionItem, Row, Input } from 'react-materialize';
import ProductCard from './ProductCard.jsx';

export default function PetCard({animals}) {
  return (
    <Collection header="Step 1: Pick a Pet">
      <CollectionItem>
        <Row>
          <Input s={12} type='select' label="Choose a pet" >
            {
              animals.map((animal) => {
                return <option key={animal.id} value={animal.name}>{animal.name}</option>
              })
            }
          </Input>
        </Row>
      </CollectionItem>
      <CollectionItem>
        <ProductCard />
      </CollectionItem>
    </Collection>
  );
}



{/*<div>
      <ul className="collection with-header">
        <li className="collection-header"><h5>Step 1: Pick a Pet</h5></li>
        <li className="collection-item input-field col s12">
          <select>
            <option value="" disabled selected>Choose a pet</option>
            <option value="1">catdog</option>
            <option value="2">horsea</option>
            <option value="3">birdy</option>
          </select>

        </li>
        <li className="collection-item"><ProductCard /></li>

      </ul>

    </div>*/}
