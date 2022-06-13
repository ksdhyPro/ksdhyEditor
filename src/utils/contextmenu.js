// 右键菜单
const { app, Menu, ipcMain, BrowserWindow, ipcRenderer } = require("electron");
// ipcRenderer.on('context-menu', (event, arg) => {

// })

export const createFileContextMenu = () => {
	ipcMain.on("file-context-menu", (event) => {
		const template = [
			{
				label: "新建文件",
				click: () => {
					event.sender.send("context-menu", "new-file");
				},
			},
		];
		const menu = Menu.buildFromTemplate(template);
		menu.popup(BrowserWindow.fromWebContents(event.sender));
		return;
	});
};
