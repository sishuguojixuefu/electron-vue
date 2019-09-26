{{#if_eq eslintConfig 'standard'}}
'use strict'

{{/if_eq}}
import { app, BrowserWindow } from 'electron'{{#if_eq eslintConfig 'airbnb'}} // eslint-disable-line{{/if_eq}}
{{#isEnabled plugins 'vuex-electron'}}
import '../renderer/store'
{{/isEnabled}}

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\'){{#if_eq eslintConfig 'airbnb'}} // eslint-disable-line{{/if_eq}}
}
const AppUpdater = require('./AppUpdater')

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  global.mainWindow = mainWindow
  global.mainWindow.webContents.on('did-finish-load', () => {
    AppUpdater.checkVersion()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
