import React from 'react';
import { connect } from 'react-redux';
import { Collection, CollectionItem, Modal, Button, Row, Dropdown, Icon, Badge, NavItem, Table } from 'react-materialize';

const Carts = () => {
  return (
    <Dropdown
      trigger={
        <Button>
          Items
          <Icon right>arrow_drop_down</Icon>
        </Button>
      }
    >
      <NavItem>
        <Table>
          <tbody>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>$7.00</td>
            </tr>
          </tbody>
        </Table>
      </NavItem>

      <NavItem>
        two
        <Badge newIcon>1</Badge>
      </NavItem>

      <NavItem>
        three
      </NavItem>
    </Dropdown>
  );
};

export default connect(null, null)(Carts);
