import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';

export default class NavList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  render() {
    const { title, links } = this.props;
    return (
      <ul
        className={classNames('NavList', {
          'NavList--isCurrent': this.state.active,
        })}
      >
        <li className="NavItem">
          <span className="NavHeading">{title}</span>
        </li>
        {links.map(link => (
          <li className="NavItem" key={link.url}>
            <NavLink
              exact
              to={link.url}
              className="NavLink"
              activeClassName="NavLink--isCurrent"
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}
