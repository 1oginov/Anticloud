/* @flow */

import * as React from 'react';

import FileListItem from '../FileListItem';
import FileEntry from '../../lib/FileEntry';

export type Props = {
  contents: Array<FileEntry>,
  handleEntryEnter: Function,
};

const FileList = ({ contents, handleEntryEnter }: Props) => (
  <ul>
    {contents.map(contentsEntry => (
      <FileListItem entry={contentsEntry} key={contentsEntry.key} onEnter={handleEntryEnter} />
    ))}
  </ul>
);

export default FileList;
