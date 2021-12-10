import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElButton, ElForm, ElFormItem, ElInput, ElCarousel, ElCarouselItem } from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/normalize.css'
const components = [ElButton, ElForm, ElFormItem, ElInput, ElCarousel, ElCarouselItem]
const app = createApp(App)
components.forEach(component => {
  app.component(component.name, component)
})
app.use(store).use(router).mount('#app')
