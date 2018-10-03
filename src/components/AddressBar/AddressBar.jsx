/* @flow */

import * as React from 'react';

export type Props = {
  handlePathChange: Function,
  handleSubmit: Function,
  path: string,
};

const AddressBar = ({ handlePathChange, handleSubmit, path }: Props) => (
  <form onSubmit={handleSubmit}>

    <input onChange={handlePathChange} type="text" value={path} />

    <button type="submit">Go</button>

  </form>
);

export default AddressBar;
