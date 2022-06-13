<template>
	<header>
		<div id="logo">零碎、记忆编辑器</div>
		<div class="menu" @click="openFolder">打开文件夹</div>
	</header>
</template>
<script setup>
import store from "@/store";
const openFolder = () => {
	window.Electron.invoke("openFolder").then((res) => {
		store.commit("setOpenFolderInfo", res);
	});
};
</script>
<style lang="less">
header {
	background-color: #000;
	height: 60px;
	-webkit-app-region: drag;
	display: flex;
	align-items: center;
	padding: 0 20px;
	color: #fff;
}
.menu {
	-webkit-app-region: no-drag;
	user-select: none;
	cursor: pointer;
}
#logo {
	margin-right: 60px;
}
</style>
