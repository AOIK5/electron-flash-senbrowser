const { app, BrowserWindow, Menu, dialog,ipcMain  } = require('electron');
const path = require('path');

let mainWindow;
console.log(process.version,process.platform,process.arch)


//获得插件信息
const getFlashPlugin = () => {
  if (process.platform === "win32") {
	  
     //x64和ia32
    if (process.arch === "x64") {
      return {
		pluginPath: path.join(__dirname,  'plugins', 'win_x64','pepflashplayer64_34_0_0_267.dll'),
        version: "34.0.0.267",
      };
    }

    return {
	  pluginPath: path.join(__dirname, 'plugins', 'win_x86','pepflashplayer32_34_0_0_267.dll'),
      version: "32.0.0.267",
    };
  }

  //苹果系统
  if (process.platform === "darwin") {
    return {
	  pluginPath: path.join(__dirname,  'plugins', 'mac','PepperFlashPlayer.plugin'),
      version: "30.0.0.127",
    };
  }
  if (process.platform === "linux") {
	if (process.arch === "ia32" || process.arch === "x32" ) {
      return {
	  pluginPath: path.join(__dirname, 'plugins', 'linux_x86','libpepflashplayer-i386.so'),
        version: "32.0.0.363",
      };
    }   
	
	
	if (process.arch === "x64") {
      return {
	   pluginPath: path.join(__dirname, 'plugins', 'linux_x64','libpepflashplayer-x86_64.so'),
        version: "32.0.0.363",
      };
    } 
    

    
	
	if (process.arch === "arm" || process.arch === "arm64"  || process.arch === "aarch64" || process.arch === "armhf" ) {
      return {
	    pluginPath: path.join(__dirname,  'plugins', 'linux_armhf','libpepflashplayer.so'),
        version: "27.0.0.187",
      };
    }   
	 
  }
  return null;
};


// 获得系统里面flash插件的位置
const { pluginPath, version } = getFlashPlugin();
console.log(pluginPath,version)
app.commandLine.appendSwitch("ppapi-flash-path", pluginPath);
app.commandLine.appendSwitch("ppapi-flash-version", version);



function createWindow() {
	
	
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
		    plugins: true,  //启用插件
		    preload: path.join(__dirname, 'preload.js'), // 可选的预加载脚本
            contextIsolation: true, // 启用上下文隔离以提高安全性
            enableRemoteModule: false, // 禁用远程模块以提高安全性
        },
    });


	// 监听来自渲染进程的消息
    ipcMain.on('navigate-to-url', (event, url) => {
	    console.log(event,url)
        // 检查 URL 是否有效（这里只是简单的检查，实际中可能需要更复杂的验证）
        if (url.startsWith('http://') || url.startsWith('https://')) {
            createNewWindow(url);
        } else {
            mainWindow.webContents.send('invalid-url', '请输入一个有效的 HTTP 或 HTTPS URL。');
        }
    });
	
    mainWindow.loadFile('pages/index.html');
	
	
	//mainWindow.loadURL('https://www.4399.com/');
	// 默认打开开发者工具
    //mainWindow.webContents.openDevTools(); 

}

function createNewWindow(url) {

    const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
		    plugins: true,  //启用插件
        }
    });
 
    newWindow.loadURL(url);
}

app.on('ready', () => {
    createWindow();
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});