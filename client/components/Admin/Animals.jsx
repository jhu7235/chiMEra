import React from 'react';
import { connect } from 'react-redux';
import { Collection, CollectionItem, Modal, Button, Row } from 'react-materialize';
import EditForm from './EditForm.jsx';
import CreateForm from './CreateForm.jsx';

function Animals(props) {
  const animals = props.animals;
  return (
    <Collection>
      <Row>
        <CollectionItem>
          <Modal
            header='Create Animal'
            trigger={
              <Button floating className='green' waves='light' icon='add'></Button>}>
            <CreateForm type={'animal'} />;
          </Modal>
        </CollectionItem>
        <CollectionItem>
          {
            animals.map((animal) => {
              return (<Modal
                header='Edit Animal'
                key={animal.id}
                trigger={
                  <Button waves='light'>{animal.name}</Button>
                }>
                <EditForm product={animal} type={'animal'} />
              </Modal>);
            })
          }
        </CollectionItem>
      </Row>
    </Collection>
  );
}

const mapState = (state) => {
  return {
    animals: state.animals,
  }
}

export default connect(mapState, null)(Animals);
