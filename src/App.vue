<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from '@/views/AppFooter'
import AppHeader from '@/views/AppHeader'

export default {
  name: 'App',
  components: {AppHeader, AppFooter},
  methods:{
    pruebaGeneral(){
        console.log("ahsdjkashjdkh")
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/*
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
*/
body{
  margin: 0;
}

@media only screen and (max-width:850px){
    .imagenMenu{
        display: none;
    }
    .container{
        flex-direction: column;
        height: 40vh;
        margin: 0;
    }
    .botonImagenMenu{
        width: 100vw;
    }
    .nav_pc{
        display: none;
    }

    .nav_responsive{
        display: flex;
    }

    .nav_izquierda{
        width: 80%;
    }
    .nav_derecha{
        width: 20%;
    }

    header h2{
        font-size: large;
    }

    h2{
        font-size: x-large;
    }

    button{
        font-size: small;
    }

    h4{
        font-size: small;
    }

    .menuPrincipal_texto{
        margin: 5% auto;
    }

    .menu{
        height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .menu_flotante{
        background-color: white;
        border: 1px solid black;
        color:black;
        font-size: small;
        position: relative;
        text-align: right;
        top:-1000px ;
        z-index: 1;
        display: none;
       /* width: 70vw;*/
    }

    .icono_menu_responsive{
        font-size: 30px;
        /* z-index: 100;*/
    }

    .icono_menu_responsive:hover > .menu_flotante{
        top:0;
    }

    .categoria{
        width: 150px;
        height: 150px;
    }

    .containerCategorias{
        margin-top: 10px;
        
    }
}
</style>
