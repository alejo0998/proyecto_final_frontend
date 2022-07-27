import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
import gAuthPlugin from 'vue3-google-oauth2';
let gauthClientId = '1089712608540-enk2ak2g0vcmhv3ghs3en79bhorgdtvi.apps.googleusercontent.com';
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
  plugin_name: 'lsa',
})

app.mount('#app')