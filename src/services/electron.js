/**
 * Electron
 *
 * Webpack is controlled by Create React App, so it handles all `require` calls, but when we in
 * a renderer process, we need to access electron directly, that's why here we exporting Electron
 * module using `window.require` call.
 *
 * @module electron
 */
export default window.require('electron');
