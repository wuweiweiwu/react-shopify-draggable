// @flow
import React, { PureComponent } from 'react';
import DraggableGeneric, {
  type Props,
  type DraggableTypes,
} from './DraggableGeneric';

// a factory which wraps a component
export default function getDraggableComponent(type: DraggableTypes) {
  return class extends PureComponent<Props> {
    render() {
      return <DraggableGeneric {...this.props} type={type} />;
    }
  };
}
