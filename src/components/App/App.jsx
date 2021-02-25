/* @flow */

import * as React from 'react';

import AddressBar from '../AddressBar';
import ErrorBoundary from '../ErrorBoundary';
import FileList from '../FileList';
import FileEntry from '../../lib/FileEntry';
import ParentButton from '../ParentButton';

export type Props = {
  entry: FileEntry,
  handleDirectoryChange: Function,
};

const App = ({ entry, handleDirectoryChange }: Props) => (
  <ErrorBoundary>

    <ParentButton entry={entry} onEntryChange={handleDirectoryChange} />

    <AddressBar entry={entry} onEntryChange={handleDirectoryChange} />

    <FileList entry={entry} onEntryChange={handleDirectoryChange} />

  </ErrorBoundary>
);

export default App;
