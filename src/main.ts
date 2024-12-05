import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

console.log(ElementPlusIconsVue)

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)

app.mount('#app')
