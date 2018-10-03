/* @flow */

import {
  compose, lifecycle, withHandlers, withStateHandlers,
} from 'recompose';

import withErrorHandler from '../../enhancers/withErrorHandler';
import FileEntry from '../../lib/FileEntry';

export default compose(
  withErrorHandler,
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

    handleSubmit: ({
      entry, errorHandler, handlePathChange, onEntryChange, path,
    }) => (event) => {
      event.preventDefault();

      const testEntry = new FileEntry(path);

      if (testEntry.path === entry.path) {
        return;
      }

      testEntry.isDirectory()
        .then((isDirectory) => {
          if (isDirectory !== true) {
            handlePathChange(entry.path);
            errorHandler(new Error(`${testEntry.path} is not a directory`));
            return;
          }

          onEntryChange(testEntry);
        });
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
