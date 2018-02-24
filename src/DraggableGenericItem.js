// @flow
/* eslint-disable no-console */
import React, { Component, type Node } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export type DraggableItemType = 'handle' | 'item' | 'zone';

export type Props = {
  // what to render the container as
  as: string,

  // classname for the container
  className?: string,

  // id for the container
  id?: string,

  children?: Node,

  // eleRef so you can access the html element ex: styling
  eleRef?: (?HTMLElement) => void,

  // what kind of Draggable element is it
  type: DraggableItemType,
};

class DraggableGenericItem extends Component<Props> {
  ownInstance: ?HTMLElement; /* eslint-disable-line react/sort-comp */

  static contextTypes = {
    contextWrapper: PropTypes.object,
  };

  static defaultProps = {
    as: 'div',
    type: 'item',
  };

  componentDidMount() {
    console.log('child componentDidMount');
    // subscribe to context updates
    this.context.contextWrapper.subscribe((): void => this.forceUpdate());

    if (this.props.eleRef) {
      this.props.eleRef(this.ownInstance);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log('child componentWillReceiveProps');
    // handle id, className without rerendering
    if (this.props.id !== nextProps.id) {
      if (this.ownInstance) {
        this.ownInstance.id = nextProps.id || '';
      }
    }
    if (this.props.className !== nextProps.className) {
      if (this.ownInstance) {
        this.ownInstance.className = nextProps.className || '';
      }
    }
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    console.log('child shouldComponentUpdate');
    if (this.props.as !== nextProps.as || this.props.type !== nextProps.type) {
      return true;
    }
    return false;
  }

  render(): Node {
    console.log('child render');
    const { as: ElementType, className, id, children, type } = this.props;

    return (
      <ElementType
        id={id}
        className={classNames({
          className,
          [this.context.contextWrapper.draggable]: type === 'item',
          [this.context.contextWrapper.handle]: type === 'handle',
          [this.context.contextWrapper.droppable]: type === 'zone',
        })}
        ref={(element: ?HTMLElement) => {
          console.log('child ref updated');
          this.ownInstance = element;
        }}
      >
        {children}
      </ElementType>
    );
  }
}

export default DraggableGenericItem;
