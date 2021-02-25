/* @flow */

import {
  compose, lifecycle, withHandlers, withState,
} from 'recompose';

export default compose(
  withState('isAvailable', 'updateIsAvailable', undefined),
  withState('isDirectory', 'updateIsDirectory', undefined),
  lifecycle({

    componentDidMount() {
      const { entry, updateIsAvailable, updateIsDirectory } = this.props;

      entry.isAvailable()
        .then((isAvailable) => {
          updateIsAvailable(isAvailable);
          // Check if directory after the availability check to prevent unnecessary calls to the
          // file system.
          return entry.isDirectory();
        })
        .then(isDirectory => updateIsDirectory(isDirectory));
    },

  }),
  withHandlers({

    handleClick: ({
      entry, isAvailable, isDirectory, onEnter,
    }) => () => {
      if (isAvailable) {
        if (isDirectory === true) {
          onEnter(entry);
        } else if (isDirectory === false) {
          entry.open();
        }
      }
    },

  }),
);
