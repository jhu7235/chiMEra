import React from 'react';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';
import { createAnimal } from '../../store/animals';
import { createEnhancement } from '../../store/enhancements';

function CreateForm({ type, onCreateSubmit }) {
  return (
    <div className="container">
      <h5>Profile</h5>
      <form onSubmit={(event) => { onCreateSubmit(event, type); }}>
        <Row>
          <Input s={6} name="name" label="Name" />
          <Input s={6} name="description" label="Description" />
          <Input s={6} name="price" label="price" />
          <Input s={6} name="imageUrl" label="imageUrl" />
        </Row>
        <Row>
          <Button
            waves="light"
            className="submit"
            type="submit"
          >Submit</Button>
        </Row>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    onCreateSubmit(event, type) {
      event.preventDefault();
      const name = event.target.name.value;
      const description =
        event.target.description.value;
      const price = event.target.price.value;
      const imageUrl = event.target.imageUrl.value;
      const productObj = { name, description, price, imageUrl };

      if (type === 'animal') {
        dispatch(createAnimal(productObj));
      }
      if (type === 'enhancement') {
        dispatch(createEnhancement(productObj));
      }
    },
  };
};

export default connect(null, mapDispatch)(CreateForm);
