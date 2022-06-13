const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	pluginOptions: {
		electronBuilder: {
			externals: ["sharp"],
			preload: "src/preload.js",
			builderOptions: {
				productName: "ksdhy",
				appId: "com.ksdhy.xyz",
				copyright: "Quber©20220611",
				directories: {
					output: "./build",
				},
				nsis: {
					oneClick: false,
					allowElevation: true,
					allowToChangeInstallationDirectory: true,
					installerIcon: "src/assets/256x256.ico",
					uninstallerIcon: "src/assets/256x256.ico",
					installerHeaderIcon: "src/assets/256x256.ico",
					createDesktopShortcut: true,
					createStartMenuShortcut: true,
					shortcutName: "ksdhy",
				},
				win: {
					target: [
						{
							target: "nsis",
							arch: ["x64"],
						},
					],
				},
			},
		},
	},
});
