import React from 'react';
import { connect } from 'react-redux';
import { Collection, CollectionItem, Modal, Button, Row } from 'react-materialize';
import EditForm from './EditForm.jsx';

function Animals(props) {
  const animals = props.animals;
  return (
    <Collection>
      <Row>
        <CollectionItem>
          <Modal
            header='Create Animal'
            trigger={
              <Button floating small className='grey' waves='light' icon='add' />}>
          </Modal>
        </CollectionItem>
        <CollectionItem>
          {
            animals.map((animal) => {
              return (<Modal
                header='Edit Animal'
                trigger={
                  <Button waves='light'><option key={animal.id} value={animal.id}>{animal.name}</option></Button>
                }>
                <p><EditForm product={animal} /></p>
              </Modal>);
            })
          }
        </CollectionItem>
      </Row>
    </Collection>
  )
}

const mapState = (state) => {
  return {
    animals: state.animals,
  }
}

export default connect(mapState, null)(Animals);
