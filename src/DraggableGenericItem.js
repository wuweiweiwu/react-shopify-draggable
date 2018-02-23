// @flow
import React, { PureComponent, type Node } from 'react';
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

  // inline styling
  style?: { [string]: string | number },
  children?: Node,

  // what kind of Draggable element is it
  type: DraggableItemType,
};

class DraggableGenericItem extends PureComponent<Props> {
  static contextTypes = {
    contextWrapper: PropTypes.object,
  };

  static defaultProps = {
    as: 'div',
    type: 'item',
  };

  // subscribe to context updates
  componentDidMount() {
    this.context.contextWrapper.subscribe((): void => this.forceUpdate());
  }

  render(): Node {
    const {
      as: ElementType,
      className,
      id,
      style,
      children,
      type,
    } = this.props;

    return (
      <ElementType
        id={id}
        className={classNames({
          className,
          [this.context.contextWrapper.draggable]: type === 'item',
          [this.context.contextWrapper.handle]: type === 'handle',
          [this.context.contextWrapper.droppable]: type === 'zone',
        })}
        style={style}
      >
        {children}
      </ElementType>
    );
  }
}

export default DraggableGenericItem;
