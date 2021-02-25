/* @flow */

/*
 * Webpack is controlled by Create React App, so it handles all `require` calls, but when we in
 * a renderer process, we need to access electron directly, that's why here we export Electron
 * module using `window.require` call.
 */

const electron = window.require('electron');

const { remote } = electron;

export {
  electron as default,
  remote,
};
