<template>
  <section>
    <div>
      <h3>{{categoria}}</h3>
    </div>
    <div class="section_senias">
    <router-link v-for="(senia, index) in senias" v-bind:key="index" :to="{name: 'AprendizajeVideo' , params: {senias: JSON.stringify(senias), categoria: categoria, index: index}}" class="contenedor_senia" :class="vista[index]">
      <span class="boton_senia">{{senia.nombre}}</span>
    </router-link>
  </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app-aprendizaje-senias',
  props: {
    categoria: String
  },
  data () {
    return {
      senias: null,
      vista: []
    }
  },
  mounted(){
    var url_get = 'https://instructorlsa.herokuapp.com/sign/category?category='+this.categoria
    var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
    var tokenSend = 'Token '+token
    axios.get(url_get, {
      headers: {
        'Authorization': tokenSend
      }
    })
    .then(response => (this.senias = response.data,
    console.log(response.data),
    console.log(response.data[0].url),
    this.darEstilos()), 
    )
  },
  methods: {
    darEstilos(){
      for(var i = 0 ; i< this.senias.length ; i++){
        if(this.senias[i].realizado){
          this.vista[i] = "realizado"
        }else{
          this.vista[i]=null
        }
      } 
    }
  }
}
</script>

<style>
.realizado{
  background-color: darkgreen !important;
}
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
.boton_senia {
  text-decoration: none;
}
.section_senias{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: auto;
  margin-bottom: 200px;
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
        margin-top: 40px;
          margin-bottom: 200px;

        
    }
}
</style>
