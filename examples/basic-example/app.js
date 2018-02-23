/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import styles from './stylesheets/app.scss';
import '../shared/favicon/favicon.ico';
import { Draggable, DraggableContainer, Handle } from '../../src';
// import { Draggable } from '@shopify/draggable';

class App extends Component {
  // componentDidMount() {
  //   const draggable = new Draggable(document.querySelectorAll('ul'), {
  //     draggable: 'li',
  //   });
  //
  //   draggable.on('drag:start', () => console.log('drag:start'));
  //   draggable.on('drag:move', () => console.log('drag:move'));
  //   draggable.on('drag:stop', () => console.log('drag:stop'));
  // }
  componentDidMount() {
    if (this.draggable) {
      this.draggable.on('drag:start', () => console.log('drag:start'));
      this.draggable.on('drag:move', () => console.log('drag:move'));
      this.draggable.on('drag:stop', () => console.log('drag:stop'));
    }
  }

  render() {
    return (
      <DraggableContainer
        as="ul"
        draggable="draggable-classname"
        handle="handle-classname"
        draggableRef={draggableInstance => (this.draggable = draggableInstance)}
      >
        <Draggable as="li" style={{ height: '100px', width: '100px' }}>
          Draggable 1
          <Handle as="p" style={{ backgroundColor: 'black' }}>
            HANDLE
          </Handle>
        </Draggable>
        <Draggable as="li">Draggable 2</Draggable>
        <Draggable as="li">Draggable 3</Draggable>
        <Draggable as="li">Draggable 4</Draggable>
        <Draggable as="li">Draggable 5</Draggable>
      </DraggableContainer>
    );
  }
}

export default App;
