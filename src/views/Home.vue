<template>
	<Header></Header>
	<div id="container">
		<Side></Side>
		<div id="main">
			<textarea
				id="editor"
				spellcheck="false"
				autocapitalize="off"
				autocomplete="off"
				autocorrect="off"
				@input="isEdit = true"
				@keydown="save($event)"
				v-model="content"
				ref="editor"
				style="
					outline: none;
					width: 100%;
					height: 99%;
					padding: 15px;
					border: none;
					box-sizing: border-box;
					resize: none;
					font-size: 1rem;
					word-spacing: 0.1rem;
					letter-spacing: 0.1rem;
					font-family: 'Roboto', sans-serif;
				"
			></textarea>
			<div class="bottom">
				<div style="margin-right: 20px">
					状态：{{ isEdit ? "未保存" : "已保存" }}
				</div>
				<div>编码：utf-8</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { Line } from "@antv/g2plot";
import Header from "@/components/Header";
import Side from "@/components/Side";
import store from "@/store";

const isEdit = ref(false);
const content = ref(store.state.fileInfo.content);
const editor = ref(null);
watch(
	() => store.state.fileInfo.content,
	(newContent) => {
		content.value = newContent;
		editor.value.focus();
	}
);
const save = (event) => {
	// ctrl+s
	if (event.ctrlKey && event.keyCode === 83) {
		if (isEdit.value) {
			window.Electron.invoke("saveFile", {
				path: store.state.fileInfo.path,
				content: content.value,
			}).then((res) => {
				store.commit("setFileInfo", {
					path: store.state.fileInfo.path,
					content: content.value,
				});
				isEdit.value = false;
			});
		}
	}
};
</script>
<style scoped>
#container {
	display: flex;
	height: calc(100% - 60px);
}
#main {
	flex: 1;
	padding: 15px;
	box-sizing: border-box;
	line-height: 30px;
	overflow: scroll;
}
.bottom {
	position: fixed;
	bottom: 10px;
	width: 100%;
	height: 20px;
	display: flex;
}
</style>
