import { createStore } from "vuex";

export default createStore({
	state: {
		openFolderInfo: {
			filePath: "",
			fileList: [],
		},
		fileInfo: {
			path: "",
			content: "",
		},
	},
	getters: {},
	mutations: {
		setOpenFolderInfo(state, openFolderInfo) {
			openFolderInfo.fileList.sort((a, b) => {
				if (a.type === "folder" && b.type === "file") {
					return -1;
				}
			});
			state.openFolderInfo = openFolderInfo;
		},
		setFileInfo(state, fileInfo) {
			state.fileInfo = fileInfo;
		},
	},
	actions: {},
	modules: {},
});
