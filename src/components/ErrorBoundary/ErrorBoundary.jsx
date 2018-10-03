/* @flow */

import * as React from 'react';

export type Props = {
  children?: React.Node,
  error: Error | void,
};

const ErrorBoundary = ({ children, error }: Props) => (
  error
    ? <div>{error.toString()}</div>
    : children
);

ErrorBoundary.defaultProps = {
  children: undefined,
};

export default ErrorBoundary;
