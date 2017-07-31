import React from 'react';
import { connect } from 'react-redux';
import { Collection, CollectionItem, Modal, Button, Row } from 'react-materialize';
import EditForm from './EditForm.jsx';
import CreateForm from './CreateForm.jsx';

function Enhancements(props) {
  const enhancements = props.enhancements;
  return (
    <Collection>
      <Row>
        <CollectionItem>
          <Modal
            header="Create Enhancement"
            trigger={
              <Button floating className='green' waves='light' icon='add' ></Button>}>
            <CreateForm type={'enhancement'} />;
          </Modal>
        </CollectionItem>
        <CollectionItem>
          {
            enhancements.map((enhancement) => {
              return (<Modal
                header='Edit Enhancement'
                key={enhancement.id}
                trigger={
                  <Button waves='light'>{enhancement.name}</Button>
                }>
                <EditForm product={enhancement} type={'enhancement'} />
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
    enhancements: state.enhancements,
  }
}

export default connect(mapState, null)(Enhancements);
