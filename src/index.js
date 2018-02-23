import DraggableContainer from './DraggableContainer';
import getDraggableComponent from './getDraggableComponent';

const DraggableItem = getDraggableComponent('item');
const DroppableZone = getDraggableComponent('zone');
const DraggableHandle = getDraggableComponent('handle');

export { DraggableItem, DraggableContainer, DraggableHandle, DroppableZone };
