import React from 'react';
import PetCard from './PetCard.jsx';
import EnhancementCard from './EnhancementCard.jsx';

export default function ProductLab() {
  return (
    <div className="container">
      <div className="row">
        <div className="col s6"><PetCard /></div>
        <div className="col s6"><EnhancementCard /></div>
      </div>
    </div>
  );
}
