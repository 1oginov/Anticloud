import { remote } from './electron';

const Store = remote.require('electron-store');
const store = new Store();

/**
 * Get home path.
 * @returns {string}
 */
export const getHomePath = () => remote.process.env.HOME;

/**
 * Get initial path.
 * @returns {string}
 */
export const getInitialPath = () => store.get('initialPath', getHomePath());

/**
 * Set initial path.
 * @param {string} path
 */
export const setInitialPath = path => store.set('initialPath', path);
