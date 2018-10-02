/* @flow */

import * as React from 'react';

import FileEntry from '../../lib/FileEntry';

export type Props = {
  entry: FileEntry,
  handleClick: Function,
};

const ParentButton = ({ entry, handleClick }: Props) => (
  entry.hasParent()
    ? <button onClick={handleClick}>Parent</button>
    : null
);

export default ParentButton;
