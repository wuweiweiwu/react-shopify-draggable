// @flow
/* eslint-disable no-console */
import React, { Component, type Node } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';

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

  /* eslint-disable-next-line class-methods-use-this */
  propertiesChanged(
    props: Props,
    nextProps: Props,
    properties: Array<string>
  ): boolean {
    let hasDifference = false;
    _.forEach(properties, (property: string): boolean => {
      if (
        !_.isEqual(
          _.get(props, property, null),
          _.get(nextProps, property, null)
        )
      ) {
        hasDifference = true;
        return false;
      }
      return true;
    });
    return hasDifference;
  }

  componentDidMount() {
    console.log('child componentDidMount');
    // subscribe to context updates
    this.context.contextWrapper.subscribe(() => {
      if (this.ownInstance) {
        this.forceUpdate();
      }
    });

    if (this.props.eleRef) {
      this.props.eleRef(this.ownInstance);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log('child componentWillReceiveProps');
    // handle id, className without rerendering
    if (!_.isEqual(this.props.id, nextProps.id)) {
      if (this.ownInstance) {
        this.ownInstance.id = nextProps.id || '';
      }
    }
    if (!_.isEqual(this.props.className, nextProps.className)) {
      if (this.ownInstance) {
        this.ownInstance.className = nextProps.className || '';
      }
    }
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    console.log('child shouldComponentUpdate');
    // type should never change. its passed from the HOC
    if (
      this.propertiesChanged(this.props, nextProps, ['as', 'children', 'type'])
    ) {
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
