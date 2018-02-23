// @flow
import React, { PureComponent, type Node } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  BaseEvent,
  BasePlugin,
  Sensors,
  Draggable,
  Droppable,
  Swappable,
  Sortable,
} from '@shopify/draggable';
const { Sensor: BaseSensor } = Sensors;

class ContextWrapper {
  draggable: ?string;
  handle: ?string;
  droppable: ?string;
  subscriptions: Array<() => void>;

  constructor(props: Props) {
    this.draggable = props.draggable;
    this.handle = props.handle;
    this.droppable = props.droppable;
    this.subscriptions = [];
  }

  update(props: Props) {
    this.draggable = props.draggable;
    this.handle = props.handle;
    this.droppable = props.droppable;
    this.subscriptions.forEach(f => f());
  }

  subscribe(f) {
    this.subscriptions.push(f);
  }
}

type Props = {
  // classname for the draggable item
  draggable: string,

  // classname for the handles
  handle: string,

  //classname for the droppable area
  droppable: ?string,

  sensors: Array<BaseSensor>,
  plugins: Array<BasePlugin>,
  delay: number,

  // add classes to elements to indicate state
  classes?: { [string]: string },

  // ref so you can access the Draggable object to override stuff if u want. Like event listeners
  draggableRef?: any => void,

  // what to append mirror to
  appendTo?: string | HTMLElement | (() => HTMLElement),

  // WHAT TO USE
  type: 'draggable' | 'droppable' | 'swappable' | 'sortable',

  // what to render the container as
  as: string,

  // classname for the container
  className?: string,

  // id for the container
  id?: string,

  //inline styling
  style?: { [string]: string | number },

  // children
  children: Node,

  // events for Draggable
  onDragStart?: BaseEvent => void,
  onDragMove?: BaseEvent => void,
  onDragOver?: BaseEvent => void,
  onDragOverContainer?: BaseEvent => void,
  onDragOut?: BaseEvent => void,
  onDragOutContainer?: BaseEvent => void,
  onDragStop?: BaseEvent => void,
  onDragPressure?: BaseEvent => void,
  onMirrorCreated?: BaseEvent => void,
  onMirrorAttached?: BaseEvent => void,
  onMirrorMove?: BaseEvent => void,
  onMirrorDestroy?: BaseEvent => void,

  // events for Droppable
  onDroppableOver?: BaseEvent => void,
  onDroppableOut?: BaseEvent => void,

  // events for Sortable
  onSortableStart?: BaseEvent => void,
  onSortableSorted?: BaseEvent => void,
  onSortableStop?: BaseEvent => void,

  // events for Swappable
  onSwappableStart?: BaseEvent => void,
  onSwappableSwapped?: BaseEvent => void,
  onSwappableStop?: BaseEvent => void,
};

class DraggableContainer extends PureComponent<Props> {
  draggableInstance: ?Draggable;
  ownInstance: ?HTMLElement;
  contextWrapper: ContextWrapper;

  static defaultProps = {
    as: 'div',
    draggable: 'draggable-source',
    handle: null,
    type: 'draggable',
    sensors: [],
    plugins: [],
    delay: 100,
  };

  static childContextTypes = {
    contextWrapper: PropTypes.object,
  };

  constructor(props: Props) {
    super(props);
    this.contextWrapper = new ContextWrapper(props);
    (this: any).registerEvents = this.registerEvents.bind(this);
    (this: any).unregisterEvents = this.unregisterEvents.bind(this);
  }

  registerEvents() {
    Object.keys(this.props).forEach(propName => {
      if (_.startsWith(propName, 'on') && _.isFunction(this.props[propName])) {
        const words = _.words(propName).slice(1);
        const eventName = _.toLower(_.join(words, ':'));
        if (this.draggableInstance) {
          this.draggableInstance.on(eventName, this.props[propName]);
        }
      }
    });
  }

  unregisterEvents() {
    Object.keys(this.props).forEach(propName => {
      if (_.startsWith(propName, 'on') && _.isFunction(this.props[propName])) {
        const words = _.words(propName).slice(1);
        const eventName = _.toLower(_.join(words, ':'));
        if (this.draggableInstance) {
          this.draggableInstance.off(eventName, this.props[propName]);
        }
      }
    });
  }

  getChildContext() {
    return {
      contextWrapper: this.contextWrapper,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    // decide if we want to update the context and force the children to rerender
    if (
      this.props.draggable !== nextProps.draggable ||
      this.props.handle !== nextProps.handle
    ) {
      this.contextWrapper.update(nextProps);
    }

    // deregister all the event
    this.unregisterEvents();
  }

  componentDidUpdate() {
    // re register events if the component updates
    this.registerEvents();
  }

  componentDidMount() {
    const {
      draggable,
      handle,
      droppable,
      classes,
      delay,
      draggableRef,
      sensors,
      plugins,
      appendTo,
      type: draggableType,
    } = this.props;

    let options = {};
    options.draggable = `.${draggable}`;
    options.handle = handle ? `.${handle}` : null;

    if (droppable) {
      options.droppable = `.${droppable}`;
    }
    if (classes) {
      options.classes = classes;
    }
    if (appendTo) {
      options.appendTo = appendTo;
    }
    options = Object.assign({}, options, {
      delay,
      sensors,
      plugins,
    });

    if (this.ownInstance) {
      switch (draggableType) {
        case 'droppable':
          this.draggableInstance = new Droppable(this.ownInstance, options);
          break;
        case 'swappable':
          this.draggableInstance = new Swappable(this.ownInstance, options);
          break;
        case 'sortable':
          this.draggableInstance = new Sortable(this.ownInstance, options);
          break;
        case 'draggable':
        default:
          this.draggableInstance = new Draggable(this.ownInstance, options);
          break;
      }
    }

    // register events
    this.registerEvents();

    if (draggableRef) {
      draggableRef(this.draggableInstance);
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
