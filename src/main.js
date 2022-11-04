import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import gAuthPlugin from 'vue3-google-oauth2';

loadFonts()

let gauthClientId = '228465296603-irq8gq0p8eomp2ajirimoh9mq61kls2o.apps.googleusercontent.com';


createApp(App)
  .use(router)
  .use(vuetify)
  .use(gAuthPlugin, {
    clientId: gauthClientId,
    scope: 'email',
    prompt: 'consent',
    plugin_name: 'lsa',
  })
  .mount('#app')




