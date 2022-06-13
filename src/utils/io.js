import { dialog, ipcMain } from "electron";
const fs = require("fs");
const path = require("path");
export const IoListener = () => {
	// 打开文件夹事件
	ipcMain.handle("openFolder", async (event, arg) => {
		let result = await dialog.showOpenDialog({
			title: "选择文件夹",
			properties: ["openDirectory"],
		});
		if (result.canceled) {
			return [];
		} else {
			let filePath = result.filePaths[0];
			let arr = fs.readdirSync(filePath);
			let fileList = arr.map((item) => {
				let stat = fs.statSync(path.join(filePath, item));
				if (stat.isFile()) {
					return {
						name: item,
						path: path.join(filePath, item),
						type: "file",
					};
				}
				if (stat.isDirectory()) {
					return {
						name: item,
						path: path.join(filePath, item),
						type: "folder",
					};
				}
			});

			return {
				filePath,
				fileList,
			};
		}
	});

	// 打开文件
	ipcMain.handle("openFile", (event, arg) => {
		return {
			path: arg,
			content: fs.readFileSync(arg).toString("utf-8"),
		};
		// fs.readFileSync(result.filePaths[0]).toString("utf-8");
	});
	// // 打开文件
	// ipcMain.handle("openFile", async (event, arg) => {
	// 	let result = await dialog.showOpenDialog({
	// 		title: "选择文件",
	// 		properties: ["openFile"],
	// 	});
	// 	if (!result.canceled) {
	// 		return fs.readFileSync(result.filePaths[0]).toString("utf-8");
	// 	} else {
	// 		return "";
	// 	}
	// });

	// 保存文件
	ipcMain.handle("saveFile", async (event, arg) => {
		let res = fs.writeFileSync(arg.path, arg.content);
		return res;
	});

	// 创建文件
	ipcMain.handle("createFile", (event, arg) => {
		fs.writeFileSync(path.join(arg.path, arg.name), "");
		return {
			name: arg.name,
			path: path.join(arg.path, arg.name),
			type: "file",
		};
	});

	// // 保存新文件
	// ipcMain.handle("saveFile", async (event, arg) => {
	// 	let result = await dialog.showSaveDialog({
	// 		title: "保存文件",
	// 		properties: ["showOverwriteConfirmation"],
	// 		message: "保存文件",
	// 	});
	// 	fs.writeFileSync(result.filePath, "sdasdsad");
	// 	return result;
	// });
};
