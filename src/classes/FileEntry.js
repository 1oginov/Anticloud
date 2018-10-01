/* @flow */

import { remote } from '../services/electron';

const fs = remote.require('fs');
const path = remote.require('path');
const { shell } = remote;

export default class FileEntry {
  isAvailableCached: boolean;

  isDirectoryCached: boolean;

  key: string;

  path: string;

  statsCached: fs.Stats;

  constructor(entryPath: string) {
    this.path = path.resolve(path.normalize(entryPath));
    this.key = this.path;
  }

  getName() {
    return path.basename(this.path);
  }

  getStats(): Promise<fs.Stats> {
    // Reject promise if not available, since `getStats` was already rejected.
    if (this.isAvailableCached === false) {
      return Promise.reject(new Error(`${this.path} is not available`));
    }

    if (this.statsCached !== undefined) {
      return Promise.resolve(this.statsCached);
    }

    return new Promise((resolve, reject) => {
      fs.stat(this.path, (error, stats) => {
        if (error) {
          this.isAvailableCached = false;

          // Try to check if directory depending on error message.
          if (error.message.indexOf('EPERM: operation not permitted') === 0) {
            this.isDirectoryCached = true;
          } else if (error.message.indexOf('EBUSY: resource busy or locked') === 0) {
            this.isDirectoryCached = false;
          }

          reject(error);
          return;
        }

        this.statsCached = stats;
        this.isAvailableCached = true;
        this.isDirectoryCached = stats.isDirectory();
        resolve(stats);
      });
    });
  }

  isAvailable() {
    if (this.isAvailableCached !== undefined) {
      return Promise.resolve(this.isAvailableCached);
    }

    return this.getStats()
      .then(() => this.isAvailableCached)
      .catch(() => this.isAvailableCached);
  }

  isDirectory() {
    if (this.isDirectoryCached !== undefined) {
      return Promise.resolve(this.isDirectoryCached);
    }

    return this.getStats()
      .then(() => this.isDirectoryCached)
      .catch(() => this.isDirectoryCached);
  }

  hasParent() {
    return !!this.getParentPath();
  }

  getParentPath() {
    const parentPath = path.resolve(this.path, '..');

    return parentPath !== this.path ? parentPath : '';
  }

  getParent(): FileEntry {
    const parentPath = this.getParentPath();

    if (!parentPath) {
      throw new Error(`${this.path} has no parent`);
    }

    return new FileEntry(parentPath);
  }

  getContents(): Promise<Array<FileEntry>> {
    return this.isDirectory()
      .then((isDirectory) => {
        if (!isDirectory) {
          return Promise.reject(new Error(`${this.path} is not a directory`));
        }

        return new Promise((resolve, reject) => {
          fs.readdir(this.path, (error, entriesNames) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(entriesNames.map(entryName => new FileEntry(path.join(this.path, entryName))));
          });
        });
      });
  }

  open() {
    return this.isDirectory()
      .then((isDirectory) => {
        if (isDirectory) {
          return Promise.reject(new Error(`${this.path} is a directory`));
        }

        return shell.openItem(this.path);
      });
  }
}
