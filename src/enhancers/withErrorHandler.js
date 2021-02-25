/* @flow */

import * as React from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

const errorHandler = (error: Error, ...other): void => {
  console.error(error, ...other); // eslint-disable-line no-console
  alert(error.toString()); // eslint-disable-line no-alert
};

export default (BaseComponent) => {
  const factory = React.createFactory(BaseComponent);
  const WithErrorHandler = props => factory({ ...props, errorHandler });

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withErrorHandler'))(WithErrorHandler);
  }

  return WithErrorHandler;
};
