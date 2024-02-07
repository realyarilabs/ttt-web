import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("./views/Home.vue"),
			name: "homepage",
		},
		{
			path: "/game/:gameID",
			component: () => import("./views/Game.vue"),
			name: "game",
		},
		{
			path: "/end",
			component: () => import("./views/EndScreen.vue"),
			name: "end",
		},
	],
})

export default router
