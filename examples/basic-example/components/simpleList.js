import React, { Component, Fragment } from 'react';

export default class SimpleList extends Component {
  render() {
    return (
      <Fragment>
        <header className="PageHeader">
          <h1 className="Heading Heading--size1">Sortable</h1>
          <h2 className="Subheading">
            Sort elements in a single collection, maintaining order for all but
            the element being dragged.
          </h2>
        </header>
        <section id="SimpleList" className="SimpleList">
          <article className="StackedListWrapper">
            <header className="StackedListHeader">
              <h3 className="Heading Heading--size3 Heading--colorWhite">
                Simple list
              </h3>
            </header>
            <ul className="StackedList">
              <li
                className="StackedListItem StackedListItem--isDraggable StackedListItem--item1"
                tabIndex="1"
              >
                <div className="StackedListContent">
                  <h4 className="Heading Heading--size4 text-no-select">
                    item one
                  </h4>
                  <div className="DragHandle" />
                  <div className="Pattern Pattern--typeHalftone" />
                  <div className="Pattern Pattern--typePlaced" />
                </div>
              </li>
              <li
                className="StackedListItem StackedListItem--isDraggable StackedListItem--item2"
                tabIndex="1"
              >
                <div className="StackedListContent">
                  <h4 className="Heading Heading--size4 text-no-select">
                    item two
                  </h4>
                  <div className="DragHandle" />
                  <div className="Pattern Pattern--typeHalftone" />
                  <div className="Pattern Pattern--typePlaced" />
                </div>
              </li>
              <li
                className="StackedListItem StackedListItem--isDraggable StackedListItem--item3"
                tabIndex="1"
              >
                <div className="StackedListContent">
                  <h4 className="Heading Heading--size4 text-no-select">
                    item three
                  </h4>
                  <div className="DragHandle" />
                  <div className="Pattern Pattern--typeHalftone" />
                  <div className="Pattern Pattern--typePlaced" />
                </div>
              </li>
              <li
                className="StackedListItem StackedListItem--isDraggable StackedListItem--item4"
                tabIndex="1"
              >
                <div className="StackedListContent">
                  <h4 className="Heading Heading--size4 text-no-select">
                    item four
                  </h4>
                  <div className="DragHandle" />
                  <div className="Pattern Pattern--typeHalftone" />
                  <div className="Pattern Pattern--typePlaced" />
                </div>
              </li>
              <li
                className="StackedListItem StackedListItem--isDraggable StackedListItem--item6"
                tabIndex="1"
              >
                <div className="StackedListContent">
                  <h4 className="Heading Heading--size4 text-no-select">
                    item six
                  </h4>
                  <div className="DragHandle" />
                  <div className="Pattern Pattern--typeHalftone" />
                  <div className="Pattern Pattern--typePlaced" />
                </div>
              </li>
              <li className="StackedListItem StackedListItem--item5">
                <div className="StackedListContent">
                  <h4 className="Heading Heading--size4 text-no-select">
                    item five
                  </h4>
                  <div className="NopeHandle" />
                </div>
              </li>
            </ul>
          </article>
        </section>
      </Fragment>
    );
  }
}
