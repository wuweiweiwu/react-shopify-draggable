import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
      <div className="MainInterior">
        <header className="PageHeader">
          <h1 className="Heading Heading--size1">Examples</h1>
          <h2 className="Subheading">
            React Shopify Draggable is a port of the original Shopify Draggable
            Library to React. All examples on this site has been ported to use
            to React version :)
          </h2>
        </header>
        <section id="Home" className="Home">
          <article className="PlateWrapper">
            <a
              href="#"
              className="Plate Plate--levelBottom Plate--isDraggable"
              title="Click to drag"
            >
              <div className="PlateShadowWrapper">
                <div className="PlateShadow" />
              </div>
              <div className="PlateContent">
                <h3 className="Heading visually-hidden">Three</h3>
              </div>
            </a>
            <a
              href="#"
              className="Plate Plate--levelMiddle Plate--isDraggable"
              title="Click to drag"
            >
              <div className="PlateShadowWrapper">
                <div className="PlateShadow" />
              </div>
              <div className="PlateContent">
                <h3 className="Heading visually-hidden">Two</h3>
              </div>
            </a>
            <a
              href="#"
              className="Plate Plate--levelTop Plate--isDraggable"
              title="Click to drag"
            >
              <div className="PlateShadowWrapper">
                <div className="PlateShadow" />
              </div>
              <div className="PlateContent">
                <h2 className="Heading Heading--size1 text-no-select">hello</h2>
                <h3 className="Heading visually-hidden">One</h3>
              </div>
            </a>
          </article>
        </section>
      </div>
    );
  }
}
