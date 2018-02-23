/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

// import styles from './stylesheets/app.scss';
import '../shared/favicon/favicon.ico';
import {
  DraggableItem,
  DraggableContainer,
  DraggableHandle,
  DroppableZone,
} from '../../src';
import { Droppable } from '@shopify/draggable';

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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     draggable: 'random-classname',
  //   };
  // }
  componentDidMount() {
    // if (this.draggable) {
    //   this.draggable.on('drag:start', () => console.log('drag:start'));
    //   this.draggable.on('drag:move', () => console.log('drag:move'));
    //   this.draggable.on('drag:stop', () => console.log('drag:stop'));
    // }
    // setInterval(
    //   () =>
    //     this.setState({
    //       draggable: `Random-string${Math.random()}`,
    //     }),
    //   1000
    // );
    //
    // import {Droppable} from '@shopify/draggable';
    // const droppable = new Droppable(document.querySelectorAll('ul'), {
    //   draggable: 'li',
    //   droppable: '.dropzone',
    // });
    //
    // droppable.on('droppable:over', () => console.log('droppable:over'));
    // droppable.on('droppable:out', () => console.log('droppable:out'));
  }

  render() {
    return (
      <DraggableContainer
        as="ul"
        type="droppable"
        draggable="random-classname"
        handle="handle-classname"
        droppable="droppable-classname"
        dragRef={draggableInstance => (this.draggable = draggableInstance)}
        onDragStart={() => console.log('dragstart')}
        onDragStop={() => console.log('dragstop')}
        onDroppableOver={() => console.log('dropover')}
      >
        <DroppableZone
          as="ul"
          id="dropzone"
          style={{ height: '300px', width: '300px', backgroundColor: 'yellow' }}
        >
          <DraggableItem as="li" style={{ height: '100px', width: '200px' }}>
            Draggable 1
            <DraggableHandle as="p" style={{ backgroundColor: 'black' }}>
              HANDLE
            </DraggableHandle>
          </DraggableItem>
          {/* <DraggableItem as="li" style={{ height: '100px', width: '200px' }}>
            Draggable 2
            <DraggableHandle as="p" style={{ backgroundColor: 'black' }}>
              HANDLE
            </DraggableHandle>
          </DraggableItem> */}
        </DroppableZone>

        <DroppableZone
          as="ul"
          id="dropzone"
          style={{ height: '300px', width: '300px', backgroundColor: 'red' }}
        />
      </DraggableContainer>
    );
  }
}

export default App;
