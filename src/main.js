import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App).use(router)
import gAuthPlugin from 'vue3-google-oauth2';
import router from './router'
let gauthClientId = '228465296603-irq8gq0p8eomp2ajirimoh9mq61kls2o.apps.googleusercontent.com';
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
  plugin_name: 'lsa',
})

app.mount('#app')