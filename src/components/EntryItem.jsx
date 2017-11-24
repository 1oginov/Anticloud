import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Entry from '../classes/Entry';

class EntryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDirectory: undefined,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.entry.isDirectory()
      .then(isDirectory => this.setState({ isDirectory }));
  }

  handleClick() {
    const { entry, onEnter } = this.props;
    const { isDirectory } = this.state;

    if (isDirectory === true) {
      onEnter(entry);
    } else if (isDirectory === false) {
      entry.open();
    }
  }

  render() {
    const { entry } = this.props;
    const { isDirectory } = this.state;
    let button;

    if (isDirectory === true) {
      button = <button onClick={this.handleClick}>Enter</button>;
    } else if (isDirectory === false) {
      button = <button onClick={this.handleClick}>Open</button>;
    }

    return (
      <li>
        {entry.path}
        {button}
      </li>
    );
  }
}

EntryItem.propTypes = {
  entry: PropTypes.instanceOf(Entry).isRequired,
  onEnter: PropTypes.func.isRequired,
};

export default EntryItem;
