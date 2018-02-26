/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import {
  DraggableItem,
  DraggableContainer,
  DraggableHandle,
  DroppableZone,
} from '../../src';
import Aside from './components/aside';
import NavButton from './components/navButton';

import SimpleList from './components/simpleList';
import Landing from './components/landing';

import '../shared/favicon/favicon.ico';
import './stylesheets/app.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavButton />
          <Aside />
          <main className="Main" role="main">
            <div className="MainInterior">
              <Route exact path="/simple-list" component={SimpleList} />
              <Route exact path="/" component={Landing} />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
