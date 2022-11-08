<template>
  <section>
    <div>
      <h3>{{categoria}}</h3>
    </div>
    <div class="section_senias">
    <router-link v-for="(senia, index) in senias" v-bind:key="index" :to="{name: 'PracticaEscribi' , params: {senias: JSON.stringify(senias), categoria: categoria, index: index}}" class="contenedor_senia">
      <span class="boton_senia">{{senia.nombre}}</span>
    </router-link>
  </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app-practica-senias',
  props: {
    categoria: String
  },
  data () {
    return {
      senias: null
    }
  },
  mounted(){
    var url_get = 'https://instructorlsa.herokuapp.com/practice/games/?categoryName='+this.categoria
    var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
    var tokenSend = 'Token '+token
    axios.get(url_get, {
      headers: {
        'Authorization': tokenSend
      }
    })
    .then(response => (this.senias = response.data,
    console.log(response.data),
    console.log(response.data[0].url)),
    
    )
  }
}
</script>

<style scoped>
h1{
    font-size: xx-large;
    padding: 10px 1%;
    text-align: left;
    margin: 0;
}
h3 {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  margin: 0;
  padding: 5px 1%;
  margin-top: 40px;
  margin-bottom: 20px;
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
.boton_senia {
  text-decoration: none;
}
.section_senias{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.contenedor_senia{
  background-color: #2673E4;
  width: 200px;
  border-radius: 10px;
  height: 30px;
  text-decoration: none;
  color: white;
  font-size: larger;
  padding: 20px;
  margin: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
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
          margin-bottom: 200px;

    }
}
</style>
