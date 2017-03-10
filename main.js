const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
//Module de signaux
const ipc = electron.ipcMain;

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let childWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    title: 'Shiawa - Jeu du Harem',
    center: true,
    // frame: false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let nbTeamGame = 0;

ipc.on('game-start', (event, nbTeam) => {
  nbTeamGame = nbTeam;

  console.log(nbTeam)

  childWindow = new BrowserWindow({
    parent: mainWindow,
    width: 1000,
    height: 300,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    title: 'Shiawa - Panel de contrôle',
    // frame: false
  });

  childWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/controls.html'),
    protocol: 'file:',
    slashes: true
  }))
})

ipc.on('controls-ready', () => {
  childWindow.webContents.send('nb-teams', nbTeamGame)
})

ipc.on('double-score-clicked', (evt, id) => {
  console.log("double score of team :" + id)
  mainWindow.webContents.send('double-score', id)
});

ipc.on('update-score-clicked', (evt, id, score) => {
  console.log("change score of team :" + id +" / score : "+ score)
  mainWindow.webContents.send('update-chart-score', id, score)
});

ipc.on('updated-score', (evt, id, score) => {
  console.log("changed score of team :" + id +" / score : "+ score)
  childWindow.webContents.send('update-input-score', id, score)
});