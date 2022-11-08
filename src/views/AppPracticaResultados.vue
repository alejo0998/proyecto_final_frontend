<template>
  <div id="resultadosFinales">
    
    <div class="resultado_grafico">
      <span style="font-size:xx-large ; font-weight:bolder; margin-bottom: 15px;">Respuestas correctas</span>
      <div class="container-grafico">
        <circle-progress 
        :percent="porcentajeAciertos" 
        :viewport="true"
        :show-percent="false"
        :is-gradient="true"
        :is-bg-shadow="true"
        :transition="1000"
        :border-width="50"
        :border-bg-width="50"
        :size="300"
        :gradient="{
            angle: 90,
            startColor: '#2673E4',
            stopColor: '#95bffc'
        }"/>
      </div>
      <span class="clase_porcentaje">{{porcentajeAciertos}}%</span>
      
      <span class="texto_resultado">{{resultado}}</span>
    </div>
    <div class="botones_resultados">
      <button @click="volverPracticar" >Volver a practicar</button>
      <button @click="volverMenu" >Menú principal</button>
      <button @click="volverAprendizaje" >Ir a la sección de aprendizaje</button>
      <button @click="volverCategoria" >Volver a selección de categoría</button>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  import "vue3-circle-progress/dist/circle-progress.css";
  import CircleProgress from "vue3-circle-progress";
  export default {
  name: 'app-practica_resultados',
  components: {CircleProgress},
  props: {
    juegos:String,
    categoriaVideo: String,
    respuestasCorrectas: Number
  }, 
  data() {
    return {
        //juegosVideo:JSON.parse(this.juegos),
        tituloRespuesta:"Elegí una opción",
        resultado:null,
        cantidadAciertos:null,
        porcentajeAciertos:null
    }
  },
  mounted(){
    this.cantidadAciertos=Number(this.respuestasCorrectas)
    this.porcentajeAciertos=Number(this.respuestasCorrectas)*10

    console.log("respuestas correctas" + this.respuestasCorrectas)
    console.log("porcentaje aciertos" +this.porcentajeAciertos)
    if(this.porcentajeAciertos > 70){
      this.resultado = "¡Felicitaciones! ¡Seguí así!"
    }else{
      if(this.porcentajeAciertos< 71 && this.porcentajeAciertos > 40 ){
        this.resultado = "¡Muy bien!"
      }else{
        this.resultado = "¡Hay que mejorar!"
      }
      
    }
    //console.log(document.getElementsByClassName("current-counter"));
    //document.getElementsByClassName("current-counter").item(0).classList.add("clase_porcentaje");
    //document.getElementsByClassName("current-counter").item(0).textContent = document.getElementsByClassName("current-counter").item(0).textContent + "%";
    //console.log( );

  },
  methods: {
    async volverPracticar(){
      var url_get = 'https://instructorlsa.herokuapp.com/practice/games_v2/?categoryName='+this.categoriaVideo
      var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
      var tokenSend = 'Token '+token
      let response = await axios.get(url_get, {
        headers: {
          'Authorization': tokenSend
        }
      })
      var juegos = response.data
      console.log(response.data)
      this.p2(this.categoriaVideo, juegos)
    },
    p2(cat , juegos ){
      console.log("empieza de nuevo")
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
    volverAprendizaje(){
        this.$router.push("/aprendizajeCategorias")
    },
    volverCategoria(){
        this.$router.push("/practicaCategorias")
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
    porcentaje(){
      this.cantidadAciertos=Number(this.respuestasCorrectas)
      return this.cantidadAciertos*100/this.juegosVideo.length
    }
    
  }
  }
  </script>
  
  <style scoped>
  .container-grafico{
    display: flex;
    flex-direction: column;
    height: 300px;
  }
  .clase_porcentaje{
    font-size: xx-large;
    font-weight: bolder;
    position: relative;
    margin-top: -167px;
  }
  .botones_resultados{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 400px;
  }
  .resultado_grafico{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 400px;
  }
  #titulo_senia {
    text-align: center;
  }
  #resultado{
    visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .vue3-circular-progressbar .current-counter{
    font-size: x-large;
    font-weight: bold;
  }
  
  .texto_resultado{
    font-size: x-large;
    font-weight: bolder;
    font-style: italic;
    text-align: center;
    margin: 15px auto;
  }
  
  button{
    width: 80%;
    padding: 3% 5px;
    margin: 10px auto;
  }
  
  #resultadosFinales{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 10% auto;
  }
  
  input{
    margin: 15px;
    width: 80%;
    background: white;
    text-align: center;
    font-size: x-large;
  }
  
  #titulo_senia {
    text-align: center;
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
  