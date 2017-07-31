import React from 'react';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';
import { updateAnimal } from '../../store/animals';
import { updateEnhancement } from '../../store/enhancements';

function EditForm({ product, onUpdateSubmit, type }) {
  return (
    <div className="container">
      <h5>Profile</h5>
      <form onSubmit={(event) => { onUpdateSubmit(event, product, type); }}>
        <Row>
          <Input s={6} name="name" label="Name" defaultValue={product.name} />
          <Input s={6} name="description" label="Description" defaultValue={product.description} />
          <Input s={6} name="price" label="price" defaultValue={product.price} />
          <Input s={6} name="imageUrl" label="imageUrl" defaultValue={product.imageUrl} />
          <div className="card-image">
            <img src={product.imageUrl}></img>
          </div>
        </Row>
        <Row>
          <Button
            waves="light"
            className="submit"
            type="submit"
          >Update {product.name}</Button>
        </Row>
      </form>
    </div>
  );
}


const mapDispatch = (dispatch) => {
  return {
    onUpdateSubmit(event, product, type) {
      event.preventDefault();
      const name = event.target.name.value;
      const description =
        event.target.description.value;
      const price = event.target.price.value;
      const imageUrl = event.target.imageUrl.value;
      const id = product.id
      const updateObj = { name, description, price, imageUrl, id };

      if (type === 'animal') {
        dispatch(updateAnimal(updateObj));
      }
      if (type === 'enhancement') {
        dispatch(updateEnhancement(updateObj));
      }
    },
  };
};

export default connect(null, mapDispatch)(EditForm);
