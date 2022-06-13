"use strict";

import {
	app,
	protocol,
	BrowserWindow,
	Tray,
	Menu,
	ipcMain,
	dialog,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { IoListener } from "./utils/io";
import { createFileContextMenu } from "./utils/contextmenu";

const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: "app", privileges: { secure: true, standard: true } },
]);

// 全局定义，避免被垃圾回收
let win;
let tray;

// 系统托盘配置
function createTray() {
	tray = new Tray("src/assets/256x256.ico");
	tray.setToolTip("可是大忽悠");
	tray.on("click", () => {
		win.show();
	});
	tray.on("right-click", () => {
		// 右键菜单
		const menu = Menu.buildFromTemplate([
			{
				label: "退出",
				click: () => {
					app.quit();
				},
			},
		]);
		tray.popUpContextMenu(menu);
	});
}

async function createWindow() {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		webPreferences: {
			nodeIntegration: true,

			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.once("ready-to-show", () => {
		win.show();
	});

	createFileContextMenu(win);

	// win.on("close", (e) => {
	// 	e.preventDefault();
	// 	// 隐藏到托盘
	// 	win.hide();
	// });

	// 打开调试工具
	if (process.env.WEBPACK_DEV_SERVER_URL) {
		win.webContents.openDevTools();
	}

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
	} else {
		createProtocol("app");
		win.loadURL("app://./index.html");
	}
}

IoListener();

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		if (tray) {
			tray.destroy();
		}

		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
	createWindow();
	createTray();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === "win32") {
		process.on("message", (data) => {
			if (data === "graceful-exit") {
				if (tray) {
					tray.destroy();
				}
				app.quit();
			}
		});
	} else {
		process.on("SIGTERM", () => {
			if (tray) {
				tray.destroy();
			}
			app.quit();
		});
	}
}
