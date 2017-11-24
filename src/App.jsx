import React, { Component } from 'react';

import FileEntry from './classes/FileEntry';
import FileEntryList from './components/FileEntryList';
import { getInitialPath } from './services/preferences';

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
  }

  render() {
    return (
      <FileEntryList entry={this.state.entry} onEntryChange={this.handleDirectoryChange} />
    );
  }
}

export default App;
