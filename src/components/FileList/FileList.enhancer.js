/* @flow */

import {
  compose, lifecycle, withHandlers, withState,
} from 'recompose';

export default compose(
  withState('contents', 'updateContents', []),
  withHandlers({

    handleEntryChange: ({ entry, updateContents }) => () => {
      entry.getContents().then(entries => updateContents(entries));
    },

    handleEntryEnter: ({ onEntryChange }) => (entry) => {
      onEntryChange(entry);
    },

  }),
  lifecycle({

    componentDidMount() {
      this.props.handleEntryChange();
    },

    componentDidUpdate(prevProps) {
      if (this.props.entry.path !== prevProps.entry.path) {
        this.props.handleEntryChange();
      }
    },

    componentWillReceiveProps(nextProps) {
      if (nextProps.entry.path !== this.props.entry.path) {
        this.props.updateContents([]);
      }
    },

  }),
);
