/* @flow */

import { withHandlers } from 'recompose';

export default withHandlers({

  handleClick: ({ entry, onEntryChange }) => () => {
    onEntryChange(entry.getParent());
  },

});
