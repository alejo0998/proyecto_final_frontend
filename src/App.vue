<template>

  <v-app style="background-color: #EAF4FF; max-height:200px">
    
    <v-toolbar app color="#2673e4" v-if="autenticado">
    <div class="logo_menu"> 
      <v-img src="./assets/icono.png" alt="Aprendizaje" title="Aprendizaje" id="logo"> </v-img>
      <v-toolbar-title> <b style="color:white">Instructor LSA</b>  </v-toolbar-title>
    </div>
      <v-spacer> </v-spacer>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          color="white"
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          {{ item.title }}
        </v-btn>
        <v-btn flat @click="handleSignOut">
          <v-icon color="white"> mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-content id="contenido" style="background-color: #EAF4FF;">
      <router-view></router-view>
    </v-content>


 <v-footer
    dark
    padless
    style="background-color: #EAF4FF;"
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          :href="icon.path"
          target="_blank"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Aprendé, Jugá, Incluí
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Instructor LSA</strong>
      </v-card-text>
    </v-card>
  </v-footer>



  </v-app>
</template>

<script>

export default {
  name: "App",
  data(){
    return {
      appTitle: 'Instructor LSA',
      sidebar: false,
      menuItems: [
          { title: 'Menú', path: '/AppHome', icon: 'home' },
          { title: 'Aprendizaje', path: '/AprendizajeCategorias', icon: 'face' },
          { title: 'Practica', path: '/PracticaCategorias', icon: 'lock_open' },
          { title: 'Juegos Integrales', path: '/JuegosIntegrales', icon: 'lock_open' }

     ],
      icons: [
        {icon: 'mdi-facebook', path: 'https://www.facebook.com/profile.php?id=100083964894684'},
        {icon: 'mdi-twitter', path: 'https://twitter.com/InstructorLsa?t=LHpJob7yisd3QnOziuU6dQ&s=09'},
        {icon: 'mdi-instagram', path: 'https://www.instagram.com/instructorlsa/?igshid=YmMyMTA2M2Y%3D'},
      ],
      autenticado: localStorage.getItem('token') ? true:false
    }
  },
  methods:{
    async handleSignOut() {
      try {
        await this.$gAuth.signOut();
        this.SesionLog = '';
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
#logo{
    width:60px;
    height:60px;
    max-width: 100px;
};

.padre{
    display: inline-block;
    width:auto;
    margin: 0px;
    text-align: justify;
}
.v-footer{
  display: contents;
  color: red;
  position: fixed;
}
.padre2{
  display:flex;
}
.contenido{
  color:#2673e4;
}
.v-card--variant-elevated, .v-card--variant-flat {
    background: #eaf4ff;
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    left: 0px;
    bottom: 0px;
    width: 100%;
    position: fixed;
}
.logo_menu{
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  gap: 5px;
}

.v-toolbar-title__placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
}
</style>
