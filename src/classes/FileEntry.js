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
    this.path = path.resolve(path.normalize(entryPath));
    this.key = this.path;

    // Properties for cached values.
    this.statsCached = undefined;
    this.isAvailableCached = undefined;
    this.isDirectoryCached = undefined;
  }

  /**
   * Get name.
   * @returns {string}
   */
  getName() {
    return path.basename(this.path);
  }

  /**
   * Get stats.
   * @returns {Promise.<(Stats|Error)>}
   */
  getStats() {
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

  /**
   * Is available?
   * @returns {Promise.<boolean>}
   */
  isAvailable() {
    if (this.isAvailableCached !== undefined) {
      return Promise.resolve(this.isAvailableCached);
    }

    return this.getStats()
      .then(() => this.isAvailableCached)
      .catch(() => this.isAvailableCached);
  }

  /**
   * Is directory?
   * @returns {Promise.<boolean|undefined>}
   */
  isDirectory() {
    if (this.isDirectoryCached !== undefined) {
      return Promise.resolve(this.isDirectoryCached);
    }

    return this.getStats()
      .then(() => this.isDirectoryCached)
      .catch(() => this.isDirectoryCached);
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
