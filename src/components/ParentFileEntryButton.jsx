import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FileEntry from '../classes/FileEntry';

class ParentFileEntryButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onEntryChange(this.props.entry.getParent());
  }

  render() {
    if (this.props.entry.hasParent()) {
      return <button onClick={this.handleClick}>Parent</button>;
    }

    return null;
  }
}

ParentFileEntryButton.propTypes = {
  entry: PropTypes.instanceOf(FileEntry).isRequired,
  onEntryChange: PropTypes.func.isRequired,
};

export default ParentFileEntryButton;
