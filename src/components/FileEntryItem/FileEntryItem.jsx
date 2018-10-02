/* @flow */

import PropTypes from 'prop-types';
import * as React from 'react';

import FileEntry from '../../lib/FileEntry';

class FileEntryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: undefined,
      isDirectory: undefined,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { entry } = this.props;

    entry.isAvailable()
      .then((isAvailable) => {
        this.setState({ isAvailable });
        // Check if directory after availability check to prevent unnecessary calls to the file
        // system.
        return entry.isDirectory();
      })
      .then(isDirectory => this.setState({ isDirectory }));
  }

  handleClick() {
    const { entry, onEnter } = this.props;
    const { isAvailable, isDirectory } = this.state;

    if (isAvailable) {
      if (isDirectory === true) {
        onEnter(entry);
      } else if (isDirectory === false) {
        entry.open();
      }
    }
  }

  render() {
    const { entry } = this.props;
    const { isAvailable, isDirectory } = this.state;
    const classes = [];
    let button;

    if (isAvailable === false) {
      classes.push('not-available');
    }

    if (isDirectory === true) {
      classes.push('directory');
      if (isAvailable) {
        button = <button onClick={this.handleClick}>Enter</button>;
      }
    } else if (isDirectory === false) {
      classes.push('file');
      if (isAvailable) {
        button = <button onClick={this.handleClick}>Open</button>;
      }
    }

    return (
      <li className={classes.join(' ')}>
        {entry.getName()}
        {button}
      </li>
    );
  }
}

FileEntryItem.propTypes = {
  entry: PropTypes.instanceOf(FileEntry).isRequired,
  onEnter: PropTypes.func.isRequired,
};

export default FileEntryItem;
