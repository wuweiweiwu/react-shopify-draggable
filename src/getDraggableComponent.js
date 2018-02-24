// @flow
import React, { Component, type ComponentType, type Node } from 'react';
import DraggableGenericItem, {
  type Props,
  type DraggableItemType,
} from './DraggableGenericItem';

// a factory which wraps a component
export default function getDraggableComponent(
  type: DraggableItemType
): ComponentType<Props> {
  return class extends Component<Props> {
    render(): Node {
      return <DraggableGenericItem {...this.props} type={type} />;
    }
  };
}
