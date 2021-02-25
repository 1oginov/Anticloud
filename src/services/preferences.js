/* @flow */

import { remote } from './electron';

const Store = remote.require('electron-store');
const store = new Store();

export const getHomePath = (): string => remote.process.env.HOME;

export const getInitialPath = (): string => store.get('initialPath', getHomePath());

export const setInitialPath = (path: string) => store.set('initialPath', path);
