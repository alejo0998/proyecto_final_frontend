import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
import gAuthPlugin from 'vue3-google-oauth2';
let gauthClientId = '228465296603-p0v9a1bj4rasrgsolq03gmo1rgu8cakr.apps.googleusercontent.com';
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
})

app.mount('#app')