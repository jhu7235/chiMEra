import React from 'react';

function AddToCartCard() {
  return (
    <div>
      <h5>Your pet, but better!</h5>
      <div id="add-to-cart-card">
        <div>
          <img
            width="100"
            src="http://static.boredpanda.com/blog/wp-content/uploads/2016/12/Meet-Zo-the-cat-who-literally-wears-her-heart-on-her-chest-585db8837f1a1__700.jpg"
          />
          <img
            width="100"
            src="https://cdn.shopify.com/s/files/1/0584/3841/products/polyester-yummy-world-large-taco-plush-5.jpg?v=1457039883"
          />
        </div>
        <div>
          <h5>Insert Product Name</h5>
          <div id="quantity-selector">
            <label display="inline" htmlFor="quantity">Quantity: </label>
            <div className="input-field" display="inline">
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <p>$100 each</p>
          </div>
        </div>
        <div>
          <p>Total: $100</p>
          <button className="btn waves-effect waves-light" type="submit" name="action">
            Add to Cart
            <i className="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCartCard;
