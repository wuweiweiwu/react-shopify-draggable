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
import ContextWrapper from './ContextWrapper';

const { Sensor: BaseSensor } = Sensors;

export type Props = {
  // classname for the draggable item
  draggable: string,

  // classname for the handles
  handle: string,

  // classname for the droppable area
  droppable: ?string,

  sensors: Array<BaseSensor>,
  plugins: Array<BasePlugin>,
  delay: number,

  // add classes to elements to indicate state
  classes?: { [string]: string },

  // dragRef so you can access the Draggable object to override stuff if u want. Like event listeners
  dragRef?: Draggable => void,

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

  // inline styling
  style?: { [string]: string | number },

  // children
  children: Node,

  /* eslint-disable react/no-unused-prop-types */
  // Draggable events
  onDragStart?: BaseEvent => void,
  onDragMove?: BaseEvent => void,
  onDragOver?: BaseEvent => void,
  onDragOverContainer?: BaseEvent => void,
  onDragOut?: BaseEvent => void,
  onDragOutContainer?: BaseEvent => void,
  onDragStop?: BaseEvent => void,
  onDragPressure?: BaseEvent => void,

  // Mirror events
  onMirrorCreated?: BaseEvent => void,
  onMirrorAttached?: BaseEvent => void,
  onMirrorMove?: BaseEvent => void,
  onMirrorDestroy?: BaseEvent => void,

  // Droppable events
  onDroppableOver?: BaseEvent => void,
  onDroppableOut?: BaseEvent => void,

  // Sortable events
  onSortableStart?: BaseEvent => void,
  onSortableSorted?: BaseEvent => void,
  onSortableStop?: BaseEvent => void,

  // Swappable events
  onSwappableStart?: BaseEvent => void,
  onSwappableSwapped?: BaseEvent => void,
  onSwappableStop?: BaseEvent => void,

  // Collidable events
  onCollidableIn?: BaseEvent => void,
  onCollidableOut?: BaseEvent => void,

  // Snappable events
  onSnapIn?: BaseEvent => void,
  onSnapOut?: BaseEvent => void,

  /* eslint-enable react/no-unused-prop-types */

  // Draggable base plugin options
  // accessibility idk :(
  mirror: {
    xAxis: boolean,
    yAxis: boolean,
    constrainDimensions: boolean,
  },

  // Draggable base sensor options
  // NONE :)

  // Additional plugin options
  // classname for the collidable element
  collidable: ?string,

  // options for SwappableAnimation
  swapAnimation: {
    duration: number,
    easingFunction: string,
  },
};

class DraggableContainer extends PureComponent<Props> {
  contextWrapper: ContextWrapper; /* eslint-disable-line react/sort-comp */
  draggableInstance: ?Draggable;
  ownInstance: ?HTMLElement;

  static defaultProps = {
    as: 'div',
    draggable: 'draggable-source',
    handle: null,
    type: 'draggable',
    sensors: [],
    plugins: [],
    delay: 100,
    mirror: {
      xAxis: true,
      yAxis: true,
      constrainDimensions: false,
    },
    swapAnimation: {
      duration: 150,
      easingFunction: 'ease-in-out',
    },
  };

  static childContextTypes = {
    contextWrapper: PropTypes.object,
  };

  constructor(props: Props) {
    super(props);
    this.contextWrapper = new ContextWrapper(props);

    /* eslint-disable flowtype/no-weak-types */
    (this: any).registerEvents = this.registerEvents.bind(this);
    (this: any).unregisterEvents = this.unregisterEvents.bind(this);
    (this: any).instantiateDraggableInstance = this.instantiateDraggableInstance.bind(
      this
    );
    /* eslint-enable flowtype/no-weak-types */
  }

  registerEvents() {
    /* eslint-disable-next-line flowtype/no-weak-types */
    _.forOwn(this.props, (propValue: any, propName: string) => {
      if (_.startsWith(propName, 'on') && _.isFunction(this.props[propName])) {
        const words = _.words(propName).slice(1);
        const eventName = _.toLower(_.join(words, ':'));
        if (this.draggableInstance) {
          this.draggableInstance.on(eventName, propValue);
        }
      }
    });
  }

  unregisterEvents() {
    /* eslint-disable-next-line flowtype/no-weak-types */
    _.forOwn(this.props, (propValue: any, propName: string) => {
      if (_.startsWith(propName, 'on') && _.isFunction(this.props[propName])) {
        const words = _.words(propName).slice(1);
        const eventName = _.toLower(_.join(words, ':'));
        if (this.draggableInstance) {
          this.draggableInstance.off(eventName, propValue);
        }
      }
    });
  }

  getChildContext(): { contextWrapper: ContextWrapper } {
    return {
      contextWrapper: this.contextWrapper,
    };
  }

  instantiateDraggableInstance() {
    const {
      draggable,
      handle,
      droppable,
      classes,
      delay,
      sensors,
      plugins,
      appendTo,
      mirror,
      collidable,
      swapAnimation,
      type: draggableType,
    } = this.props;

    let options = {};
    options.draggable = `.${draggable}`;
    options.handle = handle ? `.${handle}` : null;
    options.mirror = mirror;
    options.swapAnimation = swapAnimation;

    if (droppable) {
      options.droppable = `.${droppable}`;
    }
    if (collidable) {
      options.collidable = `.${collidable}`;
    }
    if (classes) {
      options.classes = classes;
    }
    if (appendTo) {
      options.appendTo = appendTo;
    }
    options = _.assign({}, options, {
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
  }

  componentDidMount() {
    const { dragRef } = this.props;

    // create instance of Draggable
    this.instantiateDraggableInstance();

    // register events
    this.registerEvents();

    if (dragRef) {
      dragRef(this.draggableInstance);
    }
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
    // re instaniate the Draggable instance
    this.instantiateDraggableInstance();

    // re register events if the component updates
    this.registerEvents();
  }

  componentWillUnmount() {
    if (this.draggableInstance) {
      this.draggableInstance.destroy();
    }
  }

  render(): Node {
    const { as: ElementType, id, className, style, children } = this.props;

    return (
      <ElementType
        id={id}
        className={className}
        style={style}
        ref={(element: ?HTMLElement) => {
          this.ownInstance = element;
        }}
      >
        {children}
      </ElementType>
    );
  }
}

export default DraggableContainer;
