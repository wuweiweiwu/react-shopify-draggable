// @flow
import _ from 'lodash';
import { type Props } from './DraggableContainer';

type SubscribeType = () => void;

export default class ContextWrapper {
  draggable: ?string;
  handle: ?string;
  droppable: ?string;
  subscriptions: Array<SubscribeType>;

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
    _.forEach(this.subscriptions, (f: SubscribeType): void => f());
  }

  subscribe(f: SubscribeType) {
    this.subscriptions.push(f);
  }
}
