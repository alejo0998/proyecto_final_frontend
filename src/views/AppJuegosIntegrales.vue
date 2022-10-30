<template>
  <div class="cont_cat_integrales">   
    <div class="cont_izq">
      <div id="contResultados">
        <h3>Aparecerán señas de las siguientes categorías</h3>
        <ul style="height: 400px; padding: 5px 300px;">
          <li v-for="(categoria, index) in categorias" v-bind:key="index" v-show="categoria.enabled" style="font-size: x-large; text-align: left;">{{categoria.name}}</li>
        </ul>
      </div>
      <div id="avisoSinResultados">
        <h3>No tenés categorías disponibles para jugar</h3>
        <i class="fas fa-solid fa-face-meh" id="iconoTriste"></i>
      </div>
    </div>
    <div class="botones_resultados">
      <button @click="practicarJuegosIntegrales" id="btnEmpezar">Empezar a jugar</button>
      <button @click="volverMenu" id="btnMenu">Volver al menú principal</button>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {
  name: 'app-practica-juegos-integrales',
  data() {
    return {
        categorias:[],
        juegos:null
    }
  },
  async mounted(){
    var url_get = "http://instructorlsa.herokuapp.com/practice/categories"
      var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
      var tokenSend = 'Token '+token
      let response = await axios.get(url_get, {
        headers: {
          'Authorization': tokenSend
        }
      })
      console.log(response.data)
      this.categorias = response.data
      var cats=this.categorias
      var conResultados = false;
      for(var i = 0 ; i<cats.length ; i++){
        if(cats[i].enabled){
          conResultados=true
        }
      }

      if(!conResultados){
        document.getElementById("contResultados").style.display="none"
        document.getElementById("btnEmpezar").style.display="none"
        document.getElementById("avisoSinResultados").style.display="block"
        document.getElementById("btnMenu").style.display="block"
      }else{
        document.getElementById("contResultados").style.display="block"
        document.getElementById("btnEmpezar").style.display="block"
        document.getElementById("avisoSinResultados").style.display="none"
        document.getElementById("btnMenu").style.display="none"
      }
  },
  methods: {
    async practicarJuegosIntegrales(){
      var url_get = 'http://instructorlsa.herokuapp.com/practice/games_v2/'
      var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
      var tokenSend = 'Token '+token
      let response = await axios.get(url_get, {
        headers: {
          'Authorization': tokenSend
        }
      })
      var juegos = response.data
      console.log(response.data)
      this.p2("", juegos)
    },
    p2(cat , juegos ){
      if(juegos[0].name == "Escribi la seña"){
        this.$router.push({name: "PracticaEscribi" , params:{juegos: JSON.stringify(juegos), categoriaVideo: cat, index: 0, respuestasCorrectas: 0, ruta: this.obtenerSiguienteRuta()} })
      }
      if(juegos[0].name == "Adiviná la seña"){
        this.$router.push({name: "PracticaAdivina" , params:{juegos: JSON.stringify(juegos), categoriaVideo: cat, index: 0, respuestasCorrectas: 0, ruta: this.obtenerSiguienteRuta()} })
        //escribir codigo
      }
      if(juegos[0].name == "Signá la palabra"){
        this.$router.push({name: "PracticaSigna" , params:{juegos: JSON.stringify(juegos), categoriaVideo: cat, index: 0, respuestasCorrectas: 0, ruta: this.obtenerSiguienteRuta()} })
        //escribir codigo
      }
    },
    volverMenu(){
        this.$router.push("/AppHome")
    },
    obtenerSiguienteRuta(){
        const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let aleatoria = "";
        for (let i = 0; i < 10; i++) {
            // Lee más sobre la elección del índice aleatorio en:
            // https://parzibyte.me/blog/2021/11/30/elemento-aleatorio-arreglo-javascript/
            aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
        }
        return aleatoria;
    }
  
  }
  }
  </script>
  
<style scoped>
  #iconoTriste{
    width: 50px;
    height: 50px;
    font-size: 50px;
    color: darkred;
    margin-top: 30px;
  }
  .cont_cat_integrales{
    display: flex;
    width: 100vw;
    height: 85vh;
    justify-content: space-evenly;
  }
  #avisoSinResultados{
    display: none;
  }
  #btnMenu{
    display: none;
    width: 250px;
    height: 50px;
    margin: auto;
  }
  .botones_resultados{
    width: 49vw;
    align-self: center;
  }
  .cont_izq{
    width: 49vw;
    align-self: center;
  }
  #btnEmpezar{
    width: 250px;
    height: 50px;
    margin: auto;
  }
</style>
  