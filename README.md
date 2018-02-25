# React Shopify Draggable

[![npm version](https://badge.fury.io/js/%40wuweiweiwu%2Freact-shopify-draggable.svg)](https://badge.fury.io/js/%40wuweiweiwu%2Freact-shopify-draggable)

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

Props that will **only** force a re-rendering of child `Draggable` components using `forceUpdate`:

* `draggable`
* `handle`
* `droppable`

| Props         | Type                                                              | Default                                                    | Description                                                                                                                                                        |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| as            | `string`                                                          | `'div'`                                                    | what to render this component as                                                                                                                                   |
| id            | `string`                                                          |                                                            | id to add to this element                                                                                                                                          |
| className     | `string` or `Array<string>`                                       |                                                            | class(es) to add to this element                                                                                                                                   |
| style         | `object`                                                          |                                                            | css inline styling (React style)                                                                                                                                   |
| type          | `'draggable'` or `'droppable'` or `'swappable'` or `'sortable'`   | `'draggable'`                                              | what type of `Draggable` instance is it? `Draggable`, `Droppable`, `Swappable`, `Sortable`.                                                                        |
| draggable     | `string`                                                          | `'draggable-source'`                                       | the class added to draggable items                                                                                                                                 |
| handle        | `string`                                                          | `null`                                                     | the class added to draggable handles                                                                                                                               |
| droppable     | `string`                                                          |                                                            | the class added to the droppable zone                                                                                                                              |
| collidable    | `string`                                                          |                                                            | the class that specifies the [collidable](https://github.com/Shopify/draggable/tree/master/src/Plugins/Collidable) elements                                        |
| sensors       | `Array<Sensor>`                                                   | `[]`                                                       | additional [sensors](https://github.com/Shopify/draggable/tree/master/src/Draggable/Sensors) added to `Draggable` (`MouseSensor` & `TouchSensor` already included) |
| plugins       | `Array<BasePlugin>`                                               | `[]`                                                       | additional [plugins](https://github.com/Shopify/draggable/tree/master/src/Plugins) added to `Draggable`                                                            |
| classes       | `{ [string]: string }`                                            |                                                            | object keyed by events. Values are classnames added. ex: `{ 'drag:start': '.add-class' }`                                                                          |
| eleRef        | `HTMLElement => void`                                             |                                                            | exactly like how refs work in React. This ref will return the base element of the component                                                                        |
| dragRef       | `Draggable => void`                                               |                                                            | similar to how refs work in React. This ref will return the `Draggable` instance                                                                                   |
| appendTo      | `string` or `HTMLElement` or`(()=>HTMLElement)`                   |                                                            | what to append the mirror element to                                                                                                                               |
| mirror        | `{ xAxis: boolean, yAxis: boolean, constrainDimensions: boolean}` | `{ xAxis: true, yAxis: true, constrainDimensions: false }` | mirror options (see [@shopify/draggable](https://github.com/Shopify/draggable/tree/master/src/Draggable/Plugins/Mirror) docs)                                      |
| swapAnimation | `{ duration: number, easingFunction: string }`                    | `{ duration: 150, easingFunction: 'ease-in-out' }`         | Sortable swap animation options (see [@shopify/draggable](https://github.com/Shopify/draggable/tree/master/src/Plugins/SwapAnimation) docs)                        |

#### Event Handlers

for more documentation on these see [@shopify/draggable](https://github.com/Shopify/draggable#documentation)

ex: `onDragStart` is the same as `'drag:start'` and `onSwappableStart` is the same as `'swappable:start'`

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
| style     | `object`              |         | css inline styling (React style)                                                            |
| eleRef    | `HTMLElement => void` |         | exactly like how refs work in React. This ref will return the base element of the component |

## Implementation details

`@wuweiweiwu/react-shopify-react` was built to address `@shopify/draggable` issue [#32](https://github.com/Shopify/draggable/issues/34) where users were having trouble integrating Draggable with React because re renders would cause the state of the Draggable elements to reset. Unless you wanted to implement the details of `shouldComponentUpdate` and `componentWillReceiveProps` it would be difficult to use `Draggable` with React.

This component provides a `<DraggableContainer/>` that represents the Draggable container that contains draggable elements. It also provides the classnames that child `Draggable` components will have. For example: instead of specifying the `draggable` option and also putting that class explicitly in your HTML it uses React [Context](https://reactjs.org/docs/context.html) to pass down the class names internally. Thus you should **NOT** nest `<DraggableContainer/>` inside each other.

Deciding when to rerender in React is a little finicky. If we don't want the internal `Draggable` state to change on renders then we need to implement our `shouldComponentUpdate` functions and decide how to update properties such as `id` and `className` without causing a rerender. `<DraggableContainer/>` and other components provided in this package should only rerender if you are changing `as` or `children` prop. Other prop changes should not cause a rerender, event options passed to `@shopify/draggable`. Thus we maintain an internal instance of `Draggable` that is updated in the React lifecycle function `componentWillReceiveProps` which is called when the component received new or updated props. Thus we can reset/update the instance without causing a rerender.

```javascript
shouldComponentUpdate(nextProps: Props): boolean {
  console.log('shouldComponentUpdate');
  // only rerender if as or children is different
  if (propertiesChanged(this.props, nextProps, ['as', 'children'])) {
    return true;
  }
  return false;
}
```

By using context to pass the `draggable`, `handle`, `droppable` options to child components. It means that `<DraggableItem/>`,`<DraggableHandle/>`, `<DroppableZone/>` can be nested infinitely inside other components and it will always receive these update. This functionality is implemented following this concept in this article [How to use React Context safely](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076). Thus you can even use `Redux` with this component and there will be no problems.

Setting inline styles without rerendering involved stealing some code from [Facebook React](https://github.com/facebook/react/blob/37e4329bc81def4695211d6e3795a654ef4d84f5/packages/react-dom/src/shared/CSSPropertyOperations.js)

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
