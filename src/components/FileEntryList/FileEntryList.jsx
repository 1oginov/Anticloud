/* @flow */

import PropTypes from 'prop-types';
import * as React from 'react';

import FileEntry from '../../classes/FileEntry';
import FileEntryItem from '../FileEntryItem';

class FileEntryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
    };

    this.enterEntry = this.enterEntry.bind(this);
  }

  componentDidMount() {
    this.getEntryContents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entry.path !== this.props.entry.path) {
      this.setState({
        contents: [],
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.entry.path !== prevProps.entry.path) {
      this.getEntryContents();
    }
  }

  getEntryContents() {
    this.props.entry.getContents()
      .then((entries) => {
        this.setState({
          contents: entries.map(entriesItem => (
            <FileEntryItem key={entriesItem.key} entry={entriesItem} onEnter={this.enterEntry} />
          )),
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  enterEntry(entry) {
    this.props.onEntryChange(entry);
  }

  render() {
    return (
      <div>
        <div>
          {this.props.entry.path}
        </div>
        <ul>
          {this.state.contents}
        </ul>
      </div>
    );
  }
}

FileEntryList.propTypes = {
  entry: PropTypes.instanceOf(FileEntry).isRequired,
  onEntryChange: PropTypes.func.isRequired,
};

export default FileEntryList;
