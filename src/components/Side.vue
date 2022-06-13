<template>
	<div id="side" @contextmenu="createContextmenu">
		{{ $store.state.fileInfo.name }}
		<div v-for="item in fileList" class="item" @click="open(item.path)">
			{{ item.name }}({{ item.type }})
		</div>
		<div v-if="isCreate">
			<input
				v-if="isCreate"
				type="text"
				v-model="name"
				ref="createInput"
				@blur="blur"
			/>
		</div>
	</div>
</template>
<script setup>
import { computed, ref } from "@vue/reactivity";
import store from "@/store";
import { nextTick } from "process";
const createInput = ref(null); // inputDOM，用于获取焦点
const name = ref(""); // 文件或者文件夹的名字
const createType = ref(""); // 创建的类型，文件或者文件夹
const fileList = computed(() => {
	return store.state.openFolderInfo.fileList;
});
const isCreate = ref(false);

const blur = () => {
	if (name.value) {
		if (createType.value === "file") {
			window.Electron.invoke("createFile", {
				path: store.state.openFolderInfo.filePath,
				name: name.value,
			}).then((res) => {
				store.commit("setOpenFolderInfo", {
					filePath: store.state.fileInfo.filePath,
					fileList: [...store.state.openFolderInfo.fileList, res],
				});
				isCreate.value = false;
			});
		}
	} else {
		isCreate.value = false;
	}
};

const open = (path) => {
	window.Electron.invoke("openFile", path).then((res) => {
		store.commit("setFileInfo", res);
	});
};
// 右键菜单
const createContextmenu = () => {
	window.Electron.send("file-context-menu");
};

window.Electron.ipcRenderer.on("context-menu", (event, data) => {
	if (data === "new-file") {
		isCreate.value = true;
		createType.value = "file";
		nextTick(() => {
			createInput.value.focus();
		});
	}
});
</script>
<style scoped>
#side {
	width: 300px;
	box-sizing: border-box;
	height: 100%;
	border-right: 1px solid #ccc;
	overflow-y: auto;
	/* 溢出省略号 */
	overflow-x: hidden;

	padding: 0;
}
.item {
	/* padding: 10px; */
	cursor: pointer;
	box-sizing: border-box;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	padding: 3px 10px;
	font-size: 1rem;
}
</style>
