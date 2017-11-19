import PropTypes from 'prop-types';
import React from 'react';

import Entry from '../classes/Entry';

const EntryItem = props => (
  <li>
    {props.entry.path}
  </li>
);

EntryItem.propTypes = {
  entry: PropTypes.instanceOf(Entry).isRequired,
};

export default EntryItem;
