/* @flow */

import { withStateHandlers } from 'recompose';

import FileEntry from '../../lib/FileEntry';
import { getInitialPath, setInitialPath } from '../../services/preferences';

export default withStateHandlers(
  {
    entry: new FileEntry(getInitialPath()),
  },
  {
    handleDirectoryChange: () => (entry) => {
      setInitialPath(entry.path);

      return { entry };
    },
  },
);
