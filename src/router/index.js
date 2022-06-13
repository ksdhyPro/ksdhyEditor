import { createRouter, createMemoryHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
];

const router = createRouter({
	history: createMemoryHistory(process.env.BASE_URL),
	routes,
});

export default router;
