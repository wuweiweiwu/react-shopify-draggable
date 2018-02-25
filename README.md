# React Shopify Draggable

Port of [@shopify/draggable](https://github.com/Shopify/draggable) to React

```bash
# adding to project
npm install @wuweiweiwu/react-shopify-draggable
# or
yarn add @wuweiweiwu/react-shopify-draggable
```

## [DEMO]()

## Options

### `<DraggableContainer/>`

This is the base component that wraps `<DraggableItem/>`,`<DraggableHandle/>`, `<DroppableZone/>`

You specify the `draggable`, `handle`, `droppable` props in this component and they will automatically be passed (deeply) to the `Draggable` children via React Context

Props that will cause a re-rendering of self (and also child components if `shouldComponentUpdate` returns true):

* `as`
* `children` (Nodes passed/nested as children)

Props that will **only** cause a re-rendering of child `Draggable` components:

* `draggable`
* `handle`
* `droppable`

| Props         | Type                                                              | Default                                                    | Description                                                                                 |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| as            | `string`                                                          | `'div'`                                                    | what to render this component as                                                            |
| id            | `string`                                                          |                                                            | id to add to this element                                                                   |
| className     | `string`                                                          |                                                            | class to add to this element                                                                |
| type          | `'draggable'` or `'droppable'` or `'swappable'` or `'sortable'`   | `'draggable'`                                              | what type of `Draggable` instance is it? `Draggable`, `Droppable`, `Swappable`, `Sortable`. |
| draggable     | `string`                                                          | `'draggable-source'`                                       | the class added to draggable items                                                          |
| handle        | `string`                                                          | `null`                                                     | the class added to draggable handles                                                        |
| droppable     | `string`                                                          |                                                            | the class added to the droppable zone                                                       |
| collidable    | `string`                                                          |                                                            | the class that specifies the collidable elements                                            |
| sensors       | `Array<Sensor>`                                                   | `[]`                                                       | additional sensors added to `Draggable` (`MouseSensor` & `TouchSensor` already included)    |
| plugins       | `Array<BasePlugin>`                                               | `[]`                                                       | additional plugins added to `Draggable`                                                     |
| classes       | `{ [string]: string }`                                            |                                                            | object keyed by events. Values are classnames added. ex: `{ 'drag:start': '.add-class' }`   |
| eleRef        | `HTMLElement => void`                                             |                                                            | exactly like how refs work in React. This ref will return the base element of the component |
| dragRef       | `Draggable => void`                                               |                                                            | similar to how refs work in React. This ref will return the `Draggable` instance            |
| appendTo      | `string` or `HTMLElement` or`(()=>HTMLElement)`                   |                                                            | what to append the mirror element to                                                        |
| mirror        | `{ xAxis: boolean, yAxis: boolean, constrainDimensions: boolean}` | `{ xAxis: true, yAxis: true, constrainDimensions: false }` | mirror options (see @shopify/draggable docs)                                                |
| swapAnimation | `{ duration: number, easingFunction: string }`                    | `{ duration: 150, easingFunction: 'ease-in-out' }`         | Sortable swap animation options (see @shopify/draggable docs)                               |

#### Event Handlers

for more documentation on these see @shopify/draggable

ex: `onDragStart` is the same as `'drag:start'`

```javascript
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
```

### `<DraggableItem/>`,`<DraggableHandle/>`, `<DroppableZone/>`

**NOTE #1:** `DraggableHandle` **HAS** to be nested inside a `DraggableItem` for it to work

**NOTE #2:** If you set the `handle` prop for `DraggableContainer` but don't have a `DraggableHandle` inside the container then it won't work.

Props that will cause a re-rendering of self (and child components where `shouldComponentUpdate` returns `true`):

* `as`
* `children` (Nodes passed/nested as children)

| Props     | Type                  | Default | Description                                                                                 |
| --------- | --------------------- | ------- | ------------------------------------------------------------------------------------------- |
| as        | `string`              | `'div'` | what to render this component as                                                            |
| id        | `string`              |         | id to add to this element                                                                   |
| className | `string`              |         | class to add to this element (on top of what `DraggableContainer` will inject)              |
| eleRef    | `HTMLElement => void` |         | exactly like how refs work in React. This ref will return the base element of the component |

## Contributing

After cloning the repository and running `npm install` inside, you can use the following commands to develop and build the project.

```sh
# Starts a webpack dev server that hosts a demo page with the component.
# It uses react-hot-loader so changes are reflected on save.
npm start

# Start the storybook, which has several different examples to play with.
# Also hot-reloaded.
npm run storybook

# Runs the library tests
npm test

# Lints the code with eslint
npm run lint

# run flow type checking
npm run flow

# Lints and builds the code, placing the result in the dist directory.
# This build is necessary to reflect changes if you're
#  `npm link`-ed to this repository from another local project.
npm run build
```

Pull requests are welcome!

## License

MIT
