<template>
  
  <v-app>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
         
    </v-navigation-drawer>
    
    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>

        <router-link to="/" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn icon @click="handleSignOut">
            <v-icon> mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-content>
      <router-view></router-view>
    </v-content>

    <AppFooter> </AppFooter>
  </v-app>
</template>

<script>
import AppFooter from "./views/AppFooter";

export default {
  name: "App",
  components: {AppFooter},
  data(){
    return {
      appTitle: 'Instructor LSA',
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/AppHome', icon: 'home' },
          { title: 'Aprendizaje', path: '/AprendizajeCategorias', icon: 'face' },
          { title: 'Practica', path: '/PracticaCategorias', icon: 'lock_open' },
          { title: 'Juegos Integrales', path: '/JuegosIntegrales', icon: 'lock_open' }

     ]
    }
  },
  methods:{
    async handleSignOut() {
      try {
        await this.$gAuth.signOut();
        this.SesionLog = '';
        //console.log(this.user);
        localStorage.removeItem('mailAccount');
        localStorage.removeItem('googleAccount');
        localStorage.removeItem('token');
                
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style>
    .imagenMenu{
        display: none;
    }
</style>
