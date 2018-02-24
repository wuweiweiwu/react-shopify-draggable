/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import '../shared/favicon/favicon.ico';
import {
  DraggableItem,
  DraggableContainer,
  DraggableHandle,
  DroppableZone,
} from '../../src';
import NestedItem from './nestedItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      as: 'ul',
      draggable: 'draggable-className',
      // handle: 'handle-className',
      // droppable: 'droppable-className',
      className: 'testing-className',
      id: 'testing-id',
    };
  }

  render() {
    return (
      <DraggableContainer {...this.state} type="sortable">
        <DraggableItem as="li">WHATEVER 1</DraggableItem>
        <DraggableItem as="li">WHATEVER 2</DraggableItem>
        <DraggableItem as="li">WHATEVER 3</DraggableItem>
      </DraggableContainer>
    );
  }
}

export default App;
