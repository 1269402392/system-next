import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import 'normalize.css/normalize.css'
import './assets/css/base.css'
import { regiterProperties } from './global/register-properties'
const app = createApp(App)

// registerApp(app)
// interface dataType {
//   data: any
// }
//
// lyRequest
//   .get<dataType>({
//     url: 'home/swiperdata',
//     method: 'GET'
//   })
//   .then((res) => {
//     console.log(res)
//   })
setupStore()
app.use(regiterProperties)
app.use(store).use(router).mount('#app')
