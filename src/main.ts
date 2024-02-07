import { createApp } from "vue"
import "./index.css"
import App from "./App.vue"
import { createPinia } from "pinia"
import router from "./Router"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount("#app")
