import React from 'react';

export default function ProductCard() {
  return (
    <div className="row">
      <div className="col s12">
        <div className="card">
          <div className="card-image">
            <img src="https://s-media-cache-ak0.pinimg.com/originals/ed/6a/53/ed6a53a09b6540394a53d07ddc337da8.jpg"></img>
          </div>
          <div className="card-content">
            <span className="card-title">Card Title</span>
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

//<a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
