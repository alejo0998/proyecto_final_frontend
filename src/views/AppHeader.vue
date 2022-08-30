<template id="template">
<header id="headerMenu">
    <nav class="nav_pc">
    <div class="nav_izquierda">
        <div id="imagenLogo">
        <img src="../assets/icono.png" alt="Logo Instructor LSA" title="Instructor LSA" id="logo">
        </div>
        <h2><router-link @click="validarLog" to="/AppHome">Instructor LSA </router-link></h2>
    </div>
    <div class="nav_derecha" id="linksHeader">
        <ul class="nav_menu">
        <li class="nav_menu_item" id="linkHeader"><a @click="validarLog('/aprendizajeCategorias')">Aprendizaje</a></li>
        <li class="nav_menu_item" id="linkHeader"><a @click="validarLog('/practicaCategorias')" >Práctica</a></li>
        <li class="nav_menu_item" id="linkHeader"><a @click="validarLog('/')">Juegos Integrales</a></li>
        <li class="nav_menu_item" id="linkHeader"><a @click="handleSignOut">Cerrar Sesión</a></li>
        </ul>
    </div>
    </nav>
    <nav class="nav_responsive"> 
        <div class="nav_izquierda">
          <div id="imagenLogo">
              <img src="../assets/icono.png" alt="Logo Instructor LSA" title="Instructor LSA" id="logo">
          </div>
          <h2>Instructor LSA</h2>
        </div>
        <div class="nav_derecha">
          <div class="icono_menu_responsive fas fa-bars"></div>
          <div class="menu_flotante">
            <a @click="handleSignOut">Cerrar Sesión</a>
          </div>
        </div> 
      </nav>
</header>
</template>

<script>
export default{
  name: 'app-header',
  data() {
    return {
      SesionLog: localStorage.getItem('token') != null,
    }
  },
  mounted(){
    if(!this.SesionLog){
        document.getElementById("linksHeader").style.display = "none";
    }else{
        document.getElementById("linksHeader").style.display = "flex";
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
        
        document.getElementById("linksHeader").style.display = "none";
        
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    validarLog(ruta){
        this.SesionLog=localStorage.getItem('mailAccount')
        if(!this.SesionLog){
            console.log("entroif")
            this.$router.push("/");
        }else{
            this.$router.push(ruta)
        }
    }
},
}
</script>

<style lang="css">
    header{
        background-color: #2673E4;
        display: flex;
    }
    nav {
        display: flex;
        box-sizing: border-box;
        width: 100vw;
    }
    .nav_responsive{
        display: none;
    }
    .nav_izquierda{
        width: 30%;
        display: flex;
        margin: 5px;
    }
    #imagenLogo{
        align-content: center ;
        text-align: center;
        height: 50px;
    }

    .nav_pc{
        display: flex;
        width: 100vw;
    }

    .nav_izquierda h2{
        color: white;
    }

    #logo{
        border-radius: 500px;
        height: 100%;
        margin: auto;
        object-fit: contain;
    }
    .nav_derecha{
        width: 70%;
        text-align: right;
        font-weight: bold;
        font-size: large;
        color: white;
        margin: auto;
        align-items: right;
        vertical-align: middle;
        display: flex;
        height: 100%;
        justify-content: right;
    }
    .nav_derecha a{
        text-decoration: none;
        font-size: large;
        color: white;
        padding: 0;
    }
    .nav_menu{
        display: flex;
        justify-content: right;
        list-style: none;
        height: 100%;
        margin: 0 5px;
    }

    .nav_menu li{
        width: 180px;
        margin: auto 10px;
        text-align: center;
        height: 100%;
        align-items: center;
        display: flex;
        justify-content: center;

    }
    .nav_menu_item a{
        cursor: pointer;
    }
    .nav_menu li a {
        text-decoration: none;
        font-size: large;
        color: white;
        padding: 0;
    /* width: 100px;
        margin: auto 10px;*/
    }
    header h2 a {
        color:  white;
        font-size: x-large;
        margin: auto 0;
        text-decoration: none;
    }
    h2{
        text-align: center;
        font-size: xx-large;
        font-weight: bold;
        margin: 0;
        padding: 5px;
    }
    
@media only screen and (max-width:1000px){
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
        align-items: center;
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
