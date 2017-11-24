import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FileEntry from '../classes/FileEntry';
import FileEntryItem from './FileEntryItem';

class FileEntryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
    };

    this.enterEntry = this.enterEntry.bind(this);
    this.enterParent = this.enterParent.bind(this);
  }

  componentDidMount() {
    this.getEntryContents();
  }

  componentWillReceiveProps() {
    this.setState({
      contents: [],
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.entry.path !== prevProps.entry.path) {
      this.getEntryContents();
    }
  }

  getEntryContents() {
    this.props.entry.getContents()
      .then((entries) => {
        this.setState({
          contents: entries.map(entriesItem => (
            <FileEntryItem key={entriesItem.key} entry={entriesItem} onEnter={this.enterEntry} />
          )),
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  enterEntry(entry) {
    this.props.onEntryChange(entry);
  }

  enterParent() {
    this.props.onEntryChange(this.props.entry.getParent());
  }

  render() {
    const { entry } = this.props;
    const { contents } = this.state;
    let button;

    if (entry.hasParent()) {
      button = <button onClick={this.enterParent}>Parent</button>;
    }

    return (
      <div>
        <div>
          {button}
          {entry.path}
        </div>
        <ul>
          {contents}
        </ul>
      </div>
    );
  }
}

FileEntryList.propTypes = {
  entry: PropTypes.instanceOf(FileEntry).isRequired,
  onEntryChange: PropTypes.func.isRequired,
};

export default FileEntryList;
