import React, { Component } from 'react';

export default class NavButton extends Component {
  render() {
    return (
      <button
        type="button"
        id="MobileNavActivator"
        className="Hamburger"
        aria-controls="Sidebar"
        aria-expanded="false"
      >
        <div className="HamburgerBun">
          <div className="HamburgerPatty" />
        </div>
      </button>
    );
  }
}
