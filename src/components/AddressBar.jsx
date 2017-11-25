import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FileEntry from '../classes/FileEntry';

class AddressBar extends Component {
  constructor(props) {
    super(props);

    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.resetPathInput();
  }

  componentDidUpdate() {
    this.resetPathInput();
  }

  resetPathInput() {
    this.pathInput.value = this.props.entry.path;
  }

  handleError(error) {
    // TODO: Replace alert with something... more interesting
    alert(error);
    this.resetPathInput();
  }

  handleSubmit(event) {
    event.preventDefault();

    const entry = new FileEntry(this.pathInput.value);

    if (entry.path === this.props.entry.path) {
      return;
    }

    entry.isDirectory()
      .then((isDirectory) => {
        if (!isDirectory) {
          this.handleError(`${entry.path} is not a directory`);
          return;
        }

        this.props.onEntryChange(entry);
      })
      .catch(this.handleError);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          ref={(input) => {
            this.pathInput = input;
          }}
        />
        <button>Go</button>
      </form>
    );
  }
}

AddressBar.propTypes = {
  entry: PropTypes.instanceOf(FileEntry).isRequired,
  onEntryChange: PropTypes.func.isRequired,
};

export default AddressBar;
