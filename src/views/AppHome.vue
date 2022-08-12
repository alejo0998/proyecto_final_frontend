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
                <form action="index.html">
                    <button class="botonMenu">Sección Práctica</button>
                </form>
            </div>
            <div class="botonImagenMenu">
                <img src="../assets/Integrales.png" alt="Juegos Integrales" title="Integrales" class="imagenMenu">
                <form action="index.html">
                    <button class="botonMenu">Sección Juegos Integrales</button>
                </form>
            </div>
        </div>
      </div>
</template>

<script>
export default{
  name: 'app-home'
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
        margin: 10px;
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
</style>
