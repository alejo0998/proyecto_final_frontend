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
          <h1 style="text-align: center;" v-if="sePuedeJugar"> <b> Aparecerán señas de las siguientes categorías:</b> </h1>
          <h1 style="text-align: center;" v-if="!sePuedeJugar"> <b> No tiene señas desbloqueadas</b> </h1>

          <ul>
              <li v-for="(categoria, index) in categorias" v-bind:key="index" v-show="categoria.enabled" style="font-size: x-large; text-align: left; display:flex;">  <p> <strong> {{categoria.name}} &nbsp; </strong> </p>  </li>
          </ul>
          <div style=""> 
            <button  @click="practicarJuegosIntegrales" class="button" style="margin-right:50px" v-if="sePuedeJugar"> <b> Empezar a jugar </b></button>
            <button  @click="volverMenu" class="button"><b> Volver al menú </b></button>
          </div>
        </div>

    </transition>

</template>


<script>
  import axios from 'axios';
  export default {
  name: 'app-practica-juegos-integrales',
  data() {
    return {
      categorias:[],
      juegos:null,
      showModal: false,
      sePuedeJugar: false,
    }
  },
  async created(){
      var url_get = "https://instructorlsa.herokuapp.com/practice/categories"
      var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
      var tokenSend = 'Token '+token
      let response = await axios.get(url_get, {
        headers: {
          'Authorization': tokenSend
        }
      })
      console.log(response.data)
      this.categorias = response.data
      if(this.categorias.filter(categoria=>categoria.enabled).length > 0){
        this.sePuedeJugar = true
      }
      this.showModal = true

  },
  methods: {
    async practicarJuegosIntegrales(){
      this.dialog = false
      var url_get = 'https://instructorlsa.herokuapp.com/practice/games_v2/'
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
        this.dialog = false
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

p{
  font-size: 22px;
  
}

ul{
    text-align: left;
    /* list-style: none; */
    /* margin-top: 10px; */
    /* padding-bottom: 30px; */
    display: flex;
    /* justify-content: center;*/
}




html {
  height: 100%;
  background: #FFF;
  color: #000;
  font-size: 62.5%;
}

body {
  min-height: 100%;
  margin: 0;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
}

.button {
  border: none;
  color: #FFF;
  background: #2673e4;
  appearance: none;
  font: inherit;
  font-size: 1.3rem;
  padding: .5em 1em;
  cursor: pointer;
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
  width: 35rem;
  height: 20rem;
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

</style>
  