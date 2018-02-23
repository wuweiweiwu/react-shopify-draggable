import { type Props } from './DraggableProvider';

export default class ContextWrapper {
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
