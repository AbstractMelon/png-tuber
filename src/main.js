const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const expressApp = require('./express/app');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'assets/images/base.html'));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Dragging functionality
  mainWindow.on('will-resize', (event) => {
    event.preventDefault();
  });

  // Allow dragging
  mainWindow.setIgnoreMouseEvents(false);
}

app.on('ready', () => {
  expressApp.listen(3000, () => {
    console.log('Express server running on http://localhost:3000');
  });
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('stretch-image', () => {
  mainWindow.webContents.send('stretch-image');
});

ipcMain.on('reset-image', () => {
  mainWindow.webContents.send('reset-image');
});
