import { remote } from '../services/electron';

const fs = remote.require('fs');
const path = remote.require('path');
const { shell } = remote;

/**
 * File Entry class.
 */
class FileEntry {
  /**
   * File Entry constructor.
   * @param {string} entryPath
   */
  constructor(entryPath) {
    this.path = entryPath;
    this.key = this.path;
    this.statsCache = undefined;
  }

  /**
   * Get stats.
   * @returns {Promise.<(Stats|Error)>}
   */
  getStats() {
    if (this.statsCache !== undefined) {
      return Promise.resolve(this.statsCache);
    }

    return new Promise((resolve, reject) => {
      fs.stat(this.path, (error, stats) => {
        if (error) {
          reject(error);
          return;
        }

        this.statsCache = stats;
        resolve(stats);
      });
    });
  }

  /**
   * Is directory?
   * @returns {Promise.<boolean|Error>}
   */
  isDirectory() {
    return this.getStats()
      .then(stats => stats.isDirectory());
  }

  /**
   * Has parent?
   * @returns {boolean}
   */
  hasParent() {
    return !!this.getParentPath();
  }

  /**
   * Get parent path.
   * @returns {string}
   */
  getParentPath() {
    const parentPath = path.resolve(this.path, '..');

    return parentPath !== this.path ? parentPath : '';
  }

  /**
   * Get parent.
   * @returns {FileEntry}
   */
  getParent() {
    const parentPath = this.getParentPath();

    if (!parentPath) {
      throw new Error(`${this.path} has no parent`);
    }

    return new FileEntry(parentPath);
  }

  /**
   * Get contents.
   * @returns {Promise.<(Array.<FileEntry>|Error)>}
   */
  getContents() {
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

  /**
   * Open.
   * @returns {Promise.<(boolean|Error)>}
   */
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

export default FileEntry;
