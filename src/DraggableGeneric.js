// @flow
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export type DraggableTypes = 'handle' | 'item' | 'zone';

export type Props = {
  as: string, // what to render the container as
  className?: string, // classname for the container
  id?: string, // id for the container
  style?: { [string]: string | number }, //inline styling
  children?: Node,
  type: DraggableTypes,
};

class DraggableGeneric extends PureComponent<Props> {
  static contextTypes = {
    contextWrapper: PropTypes.object,
  };

  static defaultProps = {
    as: 'div',
    type: 'item',
  };

  // subscribe to context updates
  componentDidMount() {
    this.context.contextWrapper.subscribe(() => this.forceUpdate());
  }

  render() {
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

export default DraggableGeneric;
