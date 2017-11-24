import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FileEntry from '../classes/FileEntry';
import FileEntryItem from './FileEntryItem';
import { remote } from '../services/electron';

class FileEntryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      // TODO: It may be right to to lift the state up (https://reactjs.org/docs/lifting-state-up.html)
      entry: props.initialEntry,
    };

    this.enterEntry = this.enterEntry.bind(this);
    this.enterParent = this.enterParent.bind(this);
  }

  componentDidMount() {
    this.getEntryContents();
  }

  getEntryContents(entry = this.state.entry) {
    entry.getContents()
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
    this.setState({
      entry,
    });

    this.getEntryContents(entry);
  }

  enterParent() {
    this.enterEntry(this.state.entry.getParent());
  }

  render() {
    const { contents, entry } = this.state;
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
  initialEntry: PropTypes.instanceOf(FileEntry),
};

FileEntryList.defaultProps = {
  initialEntry: new FileEntry(remote.process.env.HOME),
};

export default FileEntryList;
