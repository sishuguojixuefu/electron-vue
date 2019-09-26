const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const Store = require('electron-store')

const path = require('path')

global.store = new Store()

autoUpdater.logger = require('electron-log')
// 监听输出的日志
autoUpdater.logger.transports.file.level = 'info'
// 设置当前的版本号为自动更新的版本号
global.currentVersion = autoUpdater.currentVersion

// 监听如果自动更新失败将停止安装
autoUpdater.on('error', () => {
  global.store.set('nextInstall', false)
})
// 检查更新是否已开始时发出
autoUpdater.on('checking-for-update', () => {})
// 检测有可更新的应用包
autoUpdater.on('update-available', info => {
  dialog.showMessageBox(global.mainWindow, {
    type: 'warning',
    buttons: ['知道了'],
    title: '下载提示',
    message: `检测到有新的版本：${info.version}，立即下载。注意：在下载过程中请勿关闭应用`
  })

  // 当用户点击了知道了，就立马给渲染线程发消息,控制渲染线程禁止进行其他操作,实现的方案是使用loading
  global.mainWindow.webContents.send('update-available', info.version)
})
// 下载可更新的安装包
autoUpdater.on('update-downloaded', info => {
  global.mainWindow.setProgressBar(-1)
  // 主进程向渲染进程发送下载完成消息
  global.mainWindow.webContents.send('update-downloaded', `${info.version}下载完成`)
  const options = {
    alwaysOnTop: true,
    type: 'info',
    title: '更新提示',
    message: '最新版本已经下载完成，请立即更新。',
    detail: `请立即更新,新版本${info.releaseNotes}`,
    buttons: ['立即更新']
  }
  dialog.showMessageBox(global.mainWindow, options, index => {
    if (index === 0) {
      // 重新启动应用程序并在下载后安装更新
      autoUpdater.quitAndInstall(false, true)
    }
  })
})
module.exports = {
  checkVersion() {
    if (global.isDev) {
      autoUpdater.updateConfigPath = path.join(__dirname, '../../dev-app-update.yml')
    }
    autoUpdater.checkForUpdates()
  }
}
