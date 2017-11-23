import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Entry from '../classes/Entry';
import EntryItem from './EntryItem';
import { remote } from '../services/electron';

class EntryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      // TODO: It may be right to to lift the state up (https://reactjs.org/docs/lifting-state-up.html)
      entry: props.initialEntry,
    };

    this.enterEntry = this.enterEntry.bind(this);
  }

  componentDidMount() {
    this.getEntryContents();
  }

  getEntryContents(entry = this.state.entry) {
    entry.getContents()
      .then((entries) => {
        this.setState({
          contents: entries.map(entriesItem => (
            <EntryItem key={entriesItem.key} entry={entriesItem} onEnter={this.enterEntry} />
          )),
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  enterEntry(entry) {
    this.setState({
      entry,
    });

    this.getEntryContents(entry);
  }

  render() {
    const { contents, entry } = this.state;

    return (
      <div>
        <div>{entry.path}</div>
        <ul>
          {contents}
        </ul>
      </div>
    );
  }
}

EntryList.propTypes = {
  initialEntry: PropTypes.instanceOf(Entry),
};

EntryList.defaultProps = {
  initialEntry: new Entry(remote.process.env.HOME),
};

export default EntryList;
