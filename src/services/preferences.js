import { remote } from './electron';

/**
 * Get initial path.
 * @returns {string}
 */
export const getInitialPath = () => remote.process.env.HOME;
