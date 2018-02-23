import React, { Component } from 'react';

export default class NestedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    setInterval(
      () =>
        this.setState(prevState => ({
          counter: prevState.counter + 1,
        })),
      1000
    );
  }

  render() {
    return <div>{this.state.counter}</div>;
  }
}
