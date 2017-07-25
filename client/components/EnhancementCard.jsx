import React from 'react';
import ProductCard from './ProductCard.jsx';

export default function EnhancementCard() {
  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header"><h5>Step 2: Pick an Enhancement</h5></li>
        <li className="collection-item input-field col s12">
          <select>
            <option value="" disabled selected>Select an Upgrade</option>
            <option value="1">Wings</option>
            <option value="2">vacuum</option>
            <option value="3">taco-lasers</option>
          </select>
        </li>
        <li className="collection-item"><ProductCard /></li>

      </ul>

    </div>
  );
}
