import React, { Component } from 'react';

import AddressBar from './AddressBar';
import FileEntry from '../classes/FileEntry';
import FileEntryList from './FileEntryList';
import { getInitialPath, setInitialPath } from '../services/preferences';
import ParentFileEntryButton from './ParentFileEntryButton';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: new FileEntry(getInitialPath()),
    };

    this.handleDirectoryChange = this.handleDirectoryChange.bind(this);
  }

  handleDirectoryChange(entry) {
    this.setState({ entry });
    setInitialPath(entry.path);
  }

  render() {
    const { entry } = this.state;

    return (
      <div>
        <ParentFileEntryButton entry={entry} onEntryChange={this.handleDirectoryChange} />
        <AddressBar entry={entry} onEntryChange={this.handleDirectoryChange} />
        <FileEntryList entry={entry} onEntryChange={this.handleDirectoryChange} />
      </div>
    );
  }
}

export default App;
