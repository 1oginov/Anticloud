import PropTypes from 'prop-types';
import React from 'react';

import Entry from '../classes/Entry';
import EntryItem from './EntryItem';
import { remote } from '../services/electron';

class EntryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entryItems: [],
    };
  }

  componentDidMount() {
    this.props.entry.getContents()
      .then((entries) => {
        this.setState({
          entryItems: entries.map(entry => <EntryItem key={entry.key} entry={entry} />),
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <ul>
        {this.state.entryItems}
      </ul>
    );
  }
}

EntryList.propTypes = {
  entry: PropTypes.instanceOf(Entry),
};

EntryList.defaultProps = {
  entry: new Entry(remote.process.env.HOME),
};

export default EntryList;
