/* @flow */

import {
  compose, lifecycle, withHandlers, withStateHandlers,
} from 'recompose';

import FileEntry from '../../lib/FileEntry';

export default compose(
  withStateHandlers(
    {
      path: '',
    },
    {
      handlePathChange: () => event => ({
        path: (typeof event === 'string' ? event : event.target.value),
      }),
    },
  ),
  withHandlers({

    handleError: ({ entry, handlePathChange }) => (error) => {
      // TODO: Replace alert with something... more interesting.
      alert(error);
      handlePathChange(entry.path);
    },

  }),
  withHandlers({

    handleSubmit: ({
      entry, handleError, onEntryChange, path,
    }) => (event) => {
      event.preventDefault();

      const testEntry = new FileEntry(path);

      if (testEntry.path === entry.path) {
        return;
      }

      testEntry.isDirectory()
        .then((isDirectory) => {
          if (!isDirectory) {
            handleError(`${testEntry.path} is not a directory`);
            return;
          }

          onEntryChange(testEntry);
        })
        .catch(error => handleError(error));
    },

  }),
  lifecycle({

    componentDidMount() {
      this.props.handlePathChange(this.props.entry.path);
    },

    componentDidUpdate(prevProps) {
      if (this.props.entry.path !== prevProps.entry.path) {
        this.props.handlePathChange(this.props.entry.path);
      }
    },

  }),
);
