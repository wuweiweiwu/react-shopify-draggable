# React Shopify Draggable

Port of [@shopify/draggable](https://github.com/Shopify/draggable) to React

## [DEMO]()

### Options

#### <DraggableContainer/>

| Props         | Type                                                                    | Default                                                          | Description                                                                            |
| ------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| type          | 'draggable' or 'droppable' or 'swappable' or 'sortable'                 | 'draggable'                                                      | what type of container is it? Draggable, Droppable, Swappable, Sortable.               |
| draggable     | string                                                                  | 'draggable-source'                                               | the class added to draggable items                                                     |
| handle        | string                                                                  | null                                                             | the class added to draggable handles                                                   |
| droppable     | string                                                                  |                                                                  | the class added to the droppable zone                                                  |
| sensors       | Array<Sensor>                                                           | `[]`                                                             | additional sensors added to Draggable (MouseSensor & TouchSensor already included)     |
| plugins       | Array<BasePlugin>                                                       | `[]`                                                             | additional plugins added to Draggable                                                  |
| classes       | { [string]: string }                                                    |                                                                  | object keyed by events. Values are classnames added. Ex { 'drag:start': '.add-class' } |
| dragRef       | Draggable => void                                                       |                                                                  | similar to how refs work in React. This ref will return the Draggable instance         |
| appendTo      | string or HTMLElement or (()=>HTMLElement)                              |                                                                  | what to append the mirror element to                                                   |
| as            | string                                                                  | 'div'                                                            | what to render this container as                                                       |
| className     | string                                                                  |                                                                  | class to add to this container element                                                 |
| id            | string                                                                  |                                                                  | id to add to this container element                                                    |
| mirror        | { xAxis: boolean,<br> yAxis: boolean,<br> constrainDimensions: boolean} | { xAxis: true,<br> yAxis: true,<br> constrainDimensions: false } | mirror options (see @shopify/draggable docs)                                           |
| swapAnimation | { duration: number,<br> easingFunction: string }                        | { duration: 150,<br> easingFunction: 'ease-in-out' }             | Sortable swap animation options (see @shopify/draggable docs)                          |

#### <DraggableItem/>

#### <DraggableHandle/>

#### <DroppableZone/>
