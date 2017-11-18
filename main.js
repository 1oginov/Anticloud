const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will be closed
// automatically when the JavaScript object is garbage collected.
let appWindow;

const createWindow = () => {
  appWindow = new BrowserWindow();

  appWindow.loadURL(process.env.ELECTRON_URL || url.format({
    pathname: path.join(__dirname, 'build/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  appWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows in an array if your app
    // supports multi windows, this is the time when you should delete the corresponding element.
    appWindow = null;
  });
};

app.on('ready', createWindow);

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the dock icon is clicked and there
  // are no other windows open.
  if (appWindow === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  // On OS X it's common for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
