import React from 'react';
import { connect } from 'react-redux';
import PetCard from './PetCard.jsx';
import EnhancementCard from './EnhancementCard.jsx';

function ProductLab({animals}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col s6"><PetCard animals={animals} /></div>
        <div className="col s6"><EnhancementCard /></div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    animals: state.animals,
  }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProductLab);
