// @flow
import React, { PureComponent, type ComponentType, type Node } from 'react';
import DraggableGeneric, {
  type Props,
  type DraggableType,
} from './DraggableGeneric';

// a factory which wraps a component
export default function getDraggableComponent(
  type: DraggableType
): ComponentType<Props> {
  return class extends PureComponent<Props> {
    render(): Node {
      return <DraggableGeneric {...this.props} type={type} />;
    }
  };
}
