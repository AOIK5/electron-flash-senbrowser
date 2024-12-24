const {contextBridge, ipcRenderer} = require('electron')
contextBridge.exposeInMainWorld('myAPI', {
	//暴露参数给渲染进程
	arch:process.arch,
	platform:process.platform,
    chromeVersion:process.versions['chrome'],
	 nodeVersion:process.versions['node'],
     electronVersion:process.versions['electron'],
	//暴露给渲染进程调用的方法
    navigateToUrl: (data) => {
        ipcRenderer.send('navigate-to-url', data)
    }
})
