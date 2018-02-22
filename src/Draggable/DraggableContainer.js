// @flow
import React, { Component, type Node, cloneElement, Children } from 'react';
import classNames from 'classnames';
import Draggable from '@shopify/draggable/lib/draggable';

type Props = {
  draggable: string,
  handle: string,
  delay?: number,
  classes?: { [string]: string }, // add classes to elements to indicate state
  draggableRef?: any => void, // ref so you can access the Draggable object to override stuff if u want. Like event listeners

  as: string, // what to render the container as
  className?: string, // classname for the container
  style?: { [string]: string | number }, //inline styling
  children: Node,
};

class ContextWrapper {
  draggableClassName: string;
  handleClassName: string;
  subscriptions: Array<() => void>;

  constructor(props) {
    this.draggableClassName = props.draggable;
    this.handleClassName = props.handle;
    this.subscriptions = [];
  }

  update(props) {
    this.draggableClassName = props.draggable;
    this.handleClassName = props.handle;
    this.subscriptions.forEach(f => f());
  }

  subscribe(f) {
    this.subscriptions.push(f);
  }
}

class DraggableContainer extends Component<Props> {
  draggableInstance: ?any;
  ownInstance: ?HTMLElement;
  contextWrapper: ContextWrapper;

  static defaultProps = {
    as: 'div',
    draggable: '.draggable-source',
    handle: null,
  };

  constructor(props: Props) {
    super(props);
    this.contextWrapper = new ContextWrapper(props);
  }

  getChildContext() {
    return {
      contextWrapper: this.contextWrapper,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.contextWrapper.update(nextProps);
  }

  componentDidMount() {
    const { draggable, handle, classes, delay, draggableRef } = this.props;

    if (this.ownInstance) {
      this.draggableInstance = new Draggable(this.ownInstance, {
        draggable,
        handle,
        classes,
        delay,
      });

      if (draggableRef) {
        draggableRef(this.draggableInstance);
      }
    }
  }

  render() {
    const { as: ElementType, className, style, children } = this.props;

    return (
      <ElementType
        className={className}
        style={style}
        ref={element => {
          this.ownInstance = element;
        }}
      >
        {children}
      </ElementType>
    );
  }
}

export default DraggableContainer;
