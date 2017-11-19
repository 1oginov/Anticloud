import { remote } from '../services/electron';

const fs = remote.require('fs');
const path = remote.require('path');

/**
 * Entry class.
 */
class Entry {
  /**
   * Entry constructor.
   * @param {string} entryPath
   */
  constructor(entryPath) {
    this.path = entryPath;
    this.key = this.path;
  }

  /**
   * Get stats.
   * @returns {Promise.<(Stats|Error)>}
   */
  getStats() {
    return new Promise((resolve, reject) => {
      fs.stat(this.path, (error, stats) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(stats);
      });
    });
  }

  /**
   * Get contents.
   * @returns {Promise.<(Array.<Entry>|Error)>}
   */
  getContents() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.path, (error, entriesNames) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(entriesNames.map(entryName => new Entry(path.join(this.path, entryName))));
      });
    });
  }
}

export default Entry;
