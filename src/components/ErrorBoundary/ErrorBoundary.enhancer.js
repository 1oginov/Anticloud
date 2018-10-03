/* @flow */

import { compose, lifecycle, withState } from 'recompose';

import withErrorHandler from '../../enhancers/withErrorHandler';

export default compose(
  withErrorHandler,
  withState('error', 'updateError', undefined),
  lifecycle({

    componentDidCatch(error, info) {
      this.props.updateError(error);
      this.props.errorHandler(error, info);
    },

  }),
);
