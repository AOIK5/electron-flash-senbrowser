const btn1 = document.getElementById("navigateButton")
const input = document.getElementById("urlInput")
	
	
console.log(myAPI)



 var platformSpan = document.getElementById('platform-span');
 
 var archSpan = document.getElementById('arch-span');
 
 var chromeVersionSpan = document.getElementById('chrome-version-span');
 var nodeVersionSpan = document.getElementById('node-version-span');
 var electronVersionSpan = document.getElementById('electron-version-span');

// 设置新的内容
 platformSpan.innerHTML = myAPI.platform;
 archSpan.innerHTML= myAPI.arch;
 chromeVersionSpan.innerHTML= myAPI.chromeVersion;
 nodeVersionSpan.innerHTML= myAPI.nodeVersion;
 electronVersionSpan.innerHTML= myAPI.electronVersion;



btn1.onclick = () => {
	console.log(input.value)
    myAPI.navigateToUrl(input.value)
}