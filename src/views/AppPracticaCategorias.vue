<template>


  <section>
    <div class="containerCategorias">
      <div class="categoria" v-for="(categoria, index) in categorias" v-bind:key="index">
        <a @click="prueba(index)" :class="verificarClase(true, categoria.enabled)" :aria-disabled="!categoria.enabled">{{categoria.name}}</a>
        <a @click="prueba(index)" class="categoria_enlace_imagen" :aria-disabled="!categoria.enabled">
          <div v-if="!categoria.enabled">
            <figure title="Falta completar el aprendizaje" tooltip-dir="bottom">
              <img :src="imagenes[index]" :alt="categoria.name" :title="categoria.name" class="categoria_imagen" :class="verificarClase(false, categoria.enabled)" style="width:200px; height:200px" />
            </figure>
          </div>
          <div v-else>
            <v-img :src="imagenes[index]" :alt="categoria.name" :title="categoria.name" class="categoria_imagen" :class="verificarClase(false, categoria.enabled)"> </v-img>
          </div>

        </a>
      </div>
    </div>
  </section>
</template>

<script>
document.addEventListener('DOMContentLoaded', function () {
  let figure = document.getElementById('photo');
  let directions = document.getElementById('directions');

  directions.addEventListener('change', function () {
    figure.setAttribute('tooltip-dir', this.value);
  });
});
import axios from 'axios';
export default {
  name: 'app-practica-categorias',
  data () {
    return {
      categorias: [
        /*{nombre: 'Abecedario', pathImg: require('../assets/abecedario.png'), habilitada: true},
        {nombre: 'Colores', pathImg: require('../assets/colores.png'), habilitada: true},
        {nombre: 'Comidas', pathImg: require('../assets/comidas.png'), habilitada: true},
        {nombre: 'Geografía', pathImg: require('../assets/geografia.png'), habilitada: true},
        {nombre: 'Modales', pathImg: require('../assets/modales.png'), habilitada: true},
        {nombre: 'Números', pathImg: require('../assets/numeros.png'), habilitada: true},
        {nombre: 'Personas', pathImg: require('../assets/personas.png'), habilitada: true},
        {nombre: 'Preguntas', pathImg: require('../assets/preguntas.png'), habilitada: true},
        {nombre: 'Verbos', pathImg: require('../assets/verbos.png'), habilitada: true}*/
      ],
      imagenes:[require('../assets/abecedario.png'),
                require('../assets/colores.png'), 
                require('../assets/comidas.png'),
                require('../assets/geografia.png'),
                require('../assets/modales.png'),
                require('../assets/numeros.png'),
                require('../assets/personas.png'),
                require('../assets/preguntas.png'),
                require('../assets/verbos.png')
      ],
      juegos: null
    }
  },
  async mounted(){
    var url_get = "https://instructorlsa.herokuapp.com/practice/categories"
      var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
      var tokenSend = 'Token '+token
      let response = await axios.get(url_get, {
        headers: {
          'Authorization': tokenSend
        }
      })
      this.categorias = response.data
      console.log(response.data)
  },
  methods: {
    async prueba(index) {
      if(this.categorias[index].enabled){
        var cat = this.categorias[index].name;
        console.log(cat)
        var url_get = 'https://instructorlsa.herokuapp.com/practice/games_v2/?categoryName='+cat
        var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
        var tokenSend = 'Token '+token
        let response = await axios.get(url_get, {
          headers: {
            'Authorization': tokenSend
          }
        })
        this.juegos = response.data
        this.siguienteJuego(cat)
        console.log(response.data)
      }
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
    },
    siguienteJuego(cat ){
      if(this.juegos[0].name == "Escribi la seña"){
        this.$router.push({name: "PracticaEscribi" , params:{juegos: JSON.stringify(this.juegos), categoriaVideo: cat, index: 0, respuestasCorrectas: 0 , ruta: this.obtenerSiguienteRuta()} })
      }
      if(this.juegos[0].name == "Adiviná la seña"){
        this.$router.push({name: "PracticaAdivina" , params:{juegos: JSON.stringify(this.juegos), categoriaVideo: cat, index: 0, respuestasCorrectas: 0 , ruta: this.obtenerSiguienteRuta()}})
        //escribir codigo
      }
      if(this.juegos[0].name == "Signá la palabra"){
        //escribir codigo
        console.log(this.juegos[0].name)
        this.$router.push({name: "PracticaSigna" , params:{juegos: JSON.stringify(this.juegos), categoriaVideo: cat, index: 0, respuestasCorrectas: 0 , ruta: this.obtenerSiguienteRuta()} })
      }
    },
    verificarClase(esTitulo , enabled){
      var clase = "";
      if(esTitulo){
        clase = enabled? "": "tituloReadOnly"; 
      }else{
        clase = enabled? "": "imagenReadOnly"; 
      }
      return clase
    }
  }
}
</script>

<style scoped>

figure {
  border-radius: 100%;
  display: block;
  height: 150px;
  position: relative;
  width: 150px;
}

img {
  border-radius: inherit;
  height: inherit;
  width: inherit;
}

figure:after {
  background-color: rgba(0, 0, 0, .5);
  border-radius: 5px;
  color: #fff;
  content: attr(title);
  opacity: 0;
  padding: 6px 12px;
  position: absolute;
  left: 110%;
  top: 30px;
  transition: all .25s ease;
  visibility: hidden;
  white-space: nowrap;
}

figure[tooltip-dir="left"]:after {
  left: auto;
  right: 110%;
}

figure[tooltip-dir="bottom"]:after,
figure[tooltip-dir="top"]:after {
  left: 50%;
    right: auto;

  transform: translateX(-40%);
}

figure[tooltip-dir="bottom"]:after {
  bottom: auto;
  top: 110%;
}

figure[tooltip-dir="top"]:after {
  bottom: 110%;
  top: auto;
}

figure:hover:after {
  opacity: 1;
  visibility: visible;
}

select {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 6px 12px;
}


h1{
    font-size: xx-large;
    padding: 10px 1%;
    text-align: left;
    margin: 0;
}
.categoria a{
  cursor: pointer;
}
.rojo{
  background-color: aqua;
}
.tituloReadOnly{
  cursor: not-allowed !important;
}
.imagenReadOnly{
  opacity: 0.2;
  cursor: not-allowed !important;
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

.categoria {
  width: 250px;
  height: 250px;
  margin: 15px;
  /* background-color: burlywood;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1% 2.5%;
}

.categoria a {
  text-align: center;
  text-decoration: none;
  font-size: large;
  color: black;
  font-weight: bold;
}

.categoria button:hover {
  background-color: rgba(0, 0, 0, 0);
}

.containerCategorias {
  display: flex;
  justify-content: space-evenly;
  justify-items: left;
  flex-wrap: wrap;
  margin: auto;
  max-width: 1920px;
  margin-top: 40px;
  margin-bottom: 200px;

}

.categoria_imagen {
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 500px;
  border: 1px solid black;
  background-color: white;
}

.categoria_enlace_imagen {
  width: 80%;
  height: 80%;
  margin: auto;
  border-radius: 500px;
}
</style>
