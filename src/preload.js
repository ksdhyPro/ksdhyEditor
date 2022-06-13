// 新版本默认禁止页面中直接操作 electron的相关api
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("Electron", {
	invoke: ipcRenderer.invoke,
	send: ipcRenderer.send,
	sendTo: ipcRenderer.sendTo,
	on: (channel, func) => {
		ipcRenderer.on(channel, func);
	},
	ipcRenderer: {
		on: (key, cb) => ipcRenderer.on(key, cb),
	},
});
