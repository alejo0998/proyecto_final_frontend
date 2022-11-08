<template>
  <transition name="fade" appear>
      <div class="modal-overlay" 
          v-if="showModal" 
          @click="showModal"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" 
          role="dialog" 
          v-if="showModal"
          >
        <h1 style="text-align: center;"> <b> ¿Desea cerrar sesión? </b> </h1>
        <div style=""> 
          <button  @click="handleSignOut" class="botonMenu" style="margin-right:50px"> <b style="color:white"> Cerrar sesión</b></button>
          <button  @click="showModal=false" class="botonMenu" ><b style="color:white"> Cancelar </b></button>
        </div>

      </div>
    </transition>

  <v-app style="background-color: #EAF4FF; max-height:200px">
    
    <v-toolbar app color="#2673e4" v-if="autenticado">
    
    <div class="logo_menu" v-on:click="volverMenu()"> 
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
        <v-btn flat @click="showModal=true">
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
          //{ title: 'Menú', path: '/AppHome', icon: 'home' },
          { title: 'Aprendizaje', path: '/AprendizajeCategorias', icon: 'face' },
          { title: 'Práctica', path: '/PracticaCategorias', icon: 'lock_open' },
          { title: 'Juegos Integrales', path: '/JuegosIntegrales', icon: 'lock_open' }

     ],
      icons: [
        {icon: 'mdi-facebook', path: 'https://www.facebook.com/profile.php?id=100083964894684'},
        {icon: 'mdi-twitter', path: 'https://twitter.com/InstructorLsa?t=LHpJob7yisd3QnOziuU6dQ&s=09'},
        {icon: 'mdi-instagram', path: 'https://www.instagram.com/instructorlsa/?igshid=YmMyMTA2M2Y%3D'},
      ],
      showModal: false,
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
        this.showModal = false;
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    volverMenu(){
      this.$router.push("/AppHome");
    }
  }
};
</script>
<style>

p{
  font-size: 28px;
  
}

ul{
    text-align: left;
    display:inline-block;
    list-style:none;
    margin-top:15px;
    margin-bottom:60px;
    justify-content: center;
    font-size: 100px;
}


.button {
  border: none;
  color: #FFF;
  background: #2673e4;
  appearance: none;
  font: inherit;
  font-size: 1.3rem;
  padding: .5em 1em;
  border-radius: .3em;
  cursor: pointer;
}

.botonMenu{
      width: 25vw;
      height: 4vw;
      min-height: 45px;
      min-width: 250px;
      max-width: 350px;
      max-height: 55px;
      margin: 10px 0px;
      background-color: #2673e4;
}

.modal {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: 55rem;
  height: 13rem;
  max-width: auto;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background-color: #eaf4ff;
  z-index: 999;
  transform: none;
}
.modal h1 {
  margin: 0 0 1rem;
  font-size: x-large;

}

.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

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
  cursor:pointer;
}

.v-toolbar-title__placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
}
</style>
