import React from 'react';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';

function EditForm({ product }) {
  return (
    <div className="container">
      <h5>Your Profile</h5>
      <Row>
        <Input s={6} label="Name" defaultValue={product.name} />
        <Input s={6} label="Descriptoin" defaultValue={product.description} />
        <Input s={6} label="Tags" defaultValue={product.tags} />
        <Input s={6} label="price" defaultValue={product.price} />
        <Input s={6} label="image" defaultValue={product.imageUrl} />
        <div className="card-image">
          <img src={product.imageUrl}></img>
        </div>
      </Row>
      <Row>
        <Button s={4} waves="light">Update</Button>
      </Row>
    </div>
  );
}

const mapState = (state) => {
  return {

  }
}

export default connect(null, null)(EditForm);
