import React from 'react';
import { connect } from 'react-redux';
import { Collection, CollectionItem, Modal, Button, Row } from 'react-materialize';
import EditForm from './EditForm.jsx';

function Enhancements(props) {
  const enhancements = props.enhancements;
  return (
    <Collection>
      <Row>
        <CollectionItem>
          <Modal
            header="Create Enhancement"
            trigger={
              <Button floating className='grey' waves='light' icon='add' />}>
          </Modal>
        </CollectionItem>
        <CollectionItem>
          {
            enhancements.map((enhancement) => {
              return (<Modal
                header='Edit Enhancement'
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
  )
}

const mapState = (state) => {
  return {
    enhancements: state.enhancements,
  }
}

export default connect(mapState, null)(Enhancements);
