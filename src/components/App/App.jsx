/* @flow */

import * as React from 'react';

import AddressBar from '../AddressBar';
import FileEntryList from '../FileEntryList';
import FileEntry from '../../lib/FileEntry';
import ParentButton from '../ParentButton';

export type Props = {
  entry: FileEntry,
  handleDirectoryChange: Function,
};

const App = ({ entry, handleDirectoryChange }: Props) => (
  <React.Fragment>

    <ParentButton entry={entry} onEntryChange={handleDirectoryChange} />

    <AddressBar entry={entry} onEntryChange={handleDirectoryChange} />

    <FileEntryList entry={entry} onEntryChange={handleDirectoryChange} />

  </React.Fragment>
);

export default App;
