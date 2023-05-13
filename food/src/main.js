import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store'
import useUser from './user'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(useUser)
app.use(store)
app.mount("#app")
