/* @flow */

import classNames from 'classnames';
import * as React from 'react';

import FileEntry from '../../lib/FileEntry';

export type Props = {
  entry: FileEntry,
  handleClick: Function,
  isAvailable: boolean | void,
  isDirectory: boolean | void,
};

const FileListItem = ({
  entry, handleClick, isAvailable, isDirectory,
}: Props) => {
  let buttonName = '';

  if (isAvailable === true) {
    if (isDirectory === true) {
      buttonName = 'Enter';
    } else if (isDirectory === false) {
      buttonName = 'Open';
    }
  }

  return (
    <li
      className={classNames(
        isAvailable === false && 'not-available',
        isDirectory === false && 'file',
        isDirectory === true && 'directory',
      )}
    >

      {entry.getName()}

      {buttonName.length > 0 && (
        <button onClick={handleClick}>{buttonName}</button>
      )}

    </li>
  );
};

export default FileListItem;
