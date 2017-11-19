import PropTypes from 'prop-types';
import React from 'react';

const FileItem = props => (
  <li>{props.path}</li>
);

FileItem.propTypes = {
  path: PropTypes.string.isRequired,
};

export default FileItem;
