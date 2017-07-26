import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="row">
      <div className="col s12">
        <div className="card">
          <div className="card-image">
            <img src={product.imageUrl}></img>
          </div>
          <div className="card-content">
            <span className="card-title">{product.name}</span>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

//<a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
