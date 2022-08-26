<template>
    <div class="menu">
        <div class="menuPrincipal_texto">
          <h2 class="titulo">Menú Principal</h2>
        </div>
        <div class="container">
            <div class="botonImagenMenu">
                <img src="../assets/aprendizaje.png" alt="Aprendizaje" title="Aprendizaje" class="imagenMenu">
                <router-link to="AprendizajeCategorias">
                    <button class="botonMenu">Sección Aprendizaje</button>
                </router-link>
            </div>
            <div class="botonImagenMenu">
                <img src="../assets/practica.png" alt="Práctica" title="Practica" class="imagenMenu">
                <router-link to="PracticaCategorias">
                    <button class="botonMenu">Sección Práctica</button>
                </router-link>
            </div>
            <div class="botonImagenMenu">
                <img src="../assets/Integrales.png" alt="Juegos Integrales" title="Integrales" class="imagenMenu">
                
                    <button @click="cerrarSesion" class="botonMenu">Sección Juegos Integrales</button>
                
            </div>
        </div>
      </div>
</template>

<script>
export default{
  name: 'app-home',
  mounted(){
    console.log(localStorage.getItem('mailAccount'))
  },
  methods:{
    cerrarSesion(){
        localStorage.setItem('mailAccount' , '');
        this.$router.push("/");
    }
  }
}
</script>

<style>
    .menu{
        margin: 9% auto;
    }
    .menuPrincipal_texto{
        margin-bottom: 3%;
    }

    .menuPrincipal_botones{
        margin-top: 5%;
    }

    #headerMenu{
        display: flex;
        background-color: #2673E4;
        padding: 5px;
    }

    .imagenMenu{
        text-align: center;
        height: 60%;
        width: 60%;
        margin: auto;
        object-fit: contain;
    }

    .botonImagenMenu{
        width: 25vw;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
    }
    button{
    background-color: #2673E4;
    border-radius: 50px;
    box-shadow: 2px 2px 10px #184a94;
    border: 2px solid #184a94;
    color:white;
    padding: 10px;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
    }

    button:hover{
        background-color: #1d57ae;
    }

    .titulo{
        padding: 15px 0px;
    }

    .botonMenu{
        width: 25vw;
        height: 4vw;
        min-height: 45px;
        min-width: 250px;
        max-width: 350px;
        max-height: 55px;
        margin: 10px 0px;
    }

    .container{
        margin: auto;
        display: flex;
        text-align: center;
        justify-content: space-evenly;
    }

    .nombreApp_div{
        margin: 0;
        width: 49vw;
        /*border: 5px solid black;*/
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
