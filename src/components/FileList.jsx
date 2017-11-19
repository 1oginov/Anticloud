import PropTypes from 'prop-types';
import React from 'react';

import FileItem from './FileItem';
import { remote } from '../services/electron';

const fs = remote.require('fs');
const path = remote.require('path');

class FileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileItems: [],
    };
  }

  componentDidMount() {
    fs.readdir(this.props.path, (error, files) => {
      this.setState({
        fileItems: files.map((file) => {
          const filePath = path.join(this.props.path, file);
          return <FileItem key={filePath} path={filePath} />;
        }),
      });
    });
  }

  render() {
    return (
      <ul>
        {this.state.fileItems}
      </ul>
    );
  }
}

FileList.propTypes = {
  path: PropTypes.string.isRequired,
};

export default FileList;
