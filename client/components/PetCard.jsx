import React from 'react';
import ProductCard from './ProductCard.jsx';

export default function PetCard() {
  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header"><h5>Step 1: Pick a Pet</h5></li>
        <li className="collection-item">
          <div className="<i></i>nput-field col s12">
            <select>
              <option value="" disabled selected>Choose a pet</option>
              <option value="1">catdog</option>
              <option value="2">horsea</option>
              <option value="3">birdy</option>
            </select>
          </div>

        </li>
        <li className="collection-item"><ProductCard /></li>

      </ul>

    </div>
  );
}
