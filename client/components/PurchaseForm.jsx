import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { purchase } from '../store/pastOrders';

function createShippingAddress(e) {
  return {
    streetAddress: e.target.shippingAddress.value,
    city: e.target.shippingCity.value,
    state: e.target.shippingState.value,
    zipCode: e.target.shippingZip.value,
  }
}

function createBillingAddress(e) {
  return {
    streetAddress: e.target.billingAddress.value,
    city: e.target.billingCity.value,
    state: e.target.billingState.value,
    zipCode: e.target.billingZip.value,
  }
}

function PurchaseForm(props) {
  return (
    <div className="container">
      <h5>Shipping Address</h5>
      <form onSubmit={props.purchaseCart}>
        <Row>
          <Input name="shippingAddress" s={12} label="Address" />
          <Input name="shippingCity" s={6} label="City" />
          <Input name="shippingState" s={2} label="State" />
          <Input name="shippingZip" s={4} label="Zipcode" />
        </Row>
        <h5>Credit Card</h5>
        <Row>
          <Input name="creditNumber" s={12} label="Number" />
          <Input name="creditExp" s={6} label="Expiration" />
          <Input name="creditCSV" s={3} label="CSV" />
        </Row>
        <h5>Billing Address</h5>
        <Row>
          <Input name="billingAddress" s={12} label="Address" />
          <Input name="billingCity" s={6} label="City" />
          <Input name="billingState" s={2} label="State" />
          <Input name="billingZip" s={4} label="Zipcode" />
        </Row>
        <Row>
          <Input s={8} name='terms' type='checkbox' value='terms' label='I agree with the Terms and Conditions' />
          <Button waves='light' type="submit">Confirm</Button>
        </Row>
      </form>
    </div>
  );
}

const mapState = null;

const mapDispatch = dispatch => ({
  purchaseCart: (e) => {
    e.preventDefault();
    const shippingAddress = createShippingAddress(e);
    const billingAddress = createBillingAddress(e);
    const creditNumber = e.target.creditNumber.value;
    const creditExpiration = e.target.creditExp.value;
    const creditCSV = e.target.creditCSV.value;
    dispatch(purchase(shippingAddress, billingAddress, creditCSV, creditExpiration, creditNumber));
  },
});

export default connect(mapState, mapDispatch)(PurchaseForm);
