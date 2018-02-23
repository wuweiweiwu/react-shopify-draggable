import DraggableProvider from './DraggableProvider';
import getDraggableComponent from './getDraggableComponent';

const DraggableItem = getDraggableComponent('item');
const DroppableZone = getDraggableComponent('zone');
const DraggableHandle = getDraggableComponent('handle');

export { DraggableItem, DraggableProvider, DraggableHandle, DroppableZone };
