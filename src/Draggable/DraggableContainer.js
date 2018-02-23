// @flow
import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import Draggable from '@shopify/draggable/lib/draggable';

type Props = {
  draggable: ?string, // classname for the draggable item
  handle: ?string, // classname for the handles
  delay?: number,
  classes?: { [string]: string }, // add classes to elements to indicate state
  draggableRef?: any => void, // ref so you can access the Draggable object to override stuff if u want. Like event listeners

  as: string, // what to render the container as
  className?: string, // classname for the container
  id?: string, // id for the container
  style?: { [string]: string | number }, //inline styling
  children: Node,
};

class ContextWrapper {
  draggableClassName: ?string;
  handleClassName: ?string;
  subscriptions: Array<() => void>;

  constructor(props: Props) {
    this.draggableClassName = props.draggable;
    this.handleClassName = props.handle;
    this.subscriptions = [];
  }

  update(props: Props) {
    this.draggableClassName = props.draggable;
    this.handleClassName = props.handle;
    this.subscriptions.forEach(f => f());
  }

  subscribe(f) {
    this.subscriptions.push(f);
  }
}

class DraggableContainer extends Component<Props> {
  draggableInstance: ?Draggable;
  ownInstance: ?HTMLElement;
  contextWrapper: ContextWrapper;

  static defaultProps = {
    as: 'div',
    draggable: 'draggable-source',
    handle: null,
  };

  static childContextTypes = {
    contextWrapper: PropTypes.object,
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

  // decide if we want to update the context and force the children to rerender
  componentWillReceiveProps(nextProps: Props) {
    if (
      this.props.draggable !== nextProps.draggable ||
      this.props.handle !== nextProps.handle
    ) {
      this.contextWrapper.update(nextProps);
    }
  }

  componentDidMount() {
    const { draggable, handle, classes, delay, draggableRef } = this.props;

    const options = {};
    if (draggable) {
      options.draggable = `.${draggable}`;
    }
    if (handle) {
      options.handle = `.${handle}`;
    }
    if (classes) {
      options.classes = classes;
    }
    if (delay) {
      options.delay = delay;
    }

    if (this.ownInstance) {
      this.draggableInstance = new Draggable(this.ownInstance, options);

      if (draggableRef) {
        draggableRef(this.draggableInstance);
      }
    }
  }

  componentWillUnmount() {
    if (this.draggableInstance) {
      this.draggableInstance.destroy();
    }
  }

  render() {
    const { as: ElementType, id, className, style, children } = this.props;

    return (
      <ElementType
        id={id}
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
