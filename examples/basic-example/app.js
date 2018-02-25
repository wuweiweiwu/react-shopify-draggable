/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';

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
      hasChild: true,
      timer: 0,
    };
  }

  componentDidMount() {
    setInterval(
      () =>
        this.setState(prevState => ({
          timer: prevState.timer + 1,
        })),
      1000
    );
  }
  render() {
    return (
      <Fragment>
        <div>my own timer {this.state.timer}</div>

        <DraggableContainer {...this.state} type="sortable">
          {/* <DraggableItem as="li">
            WHATEVER 1<NestedItem />
          </DraggableItem> */}
          <DraggableItem as="li">
            WHATEVER 2<NestedItem />
          </DraggableItem>
          {this.state.hasChild && (
            <DraggableItem as="li">
              WHATEVER 3<NestedItem />
            </DraggableItem>
          )}
        </DraggableContainer>
      </Fragment>
    );
  }
}

export default App;
