<template>
  <div>
      <div>
          <h1 id="titulo_senia">Adiviná la seña</h1>
      </div>
      <div class="container_video_flechas">
          <div class="container_video">
              <iframe :src="juegosVideo[index].sign.urlVideo+'?controls=0'" allow="autoplay" allowfullscreen="false" aria-setsize="1920px" 
                  class="video"></iframe>
          </div>
          <div id="respuesta" class="adivina">
            <span>{{tituloRespuesta}}</span>
                <div style="height: 50px;">
                  <i id="iconoRespuesta" v-show="tituloRespuesta!='Elegí una opción'"></i>
                </div>
              <div class="containerRespuestas">                 
                <div v-for="(opcion, i) in juegosVideo[index].options" v-bind:key="i" >
                  <button @click="valida(i)" class="buttonLista" > <b style="color:white"> {{opcion.text}} </b>  </button>
                </div>
              </div>
              <h3 id="timer" v-show="tituloRespuesta=='Elegí una opción'">Tiempo disponible: {{timer}}</h3>
              <div id="resultado">
                <button @click="avanzar">Continuar</button>
            </div> 
          </div>
      </div>
  </div>
</template>

<script>
export default {
name: 'app-practica_adivina',
props: {
  juegos: String,
  categoriaVideo: String,
  index: Number,
  respuestasCorrectas: Number,
  ruta:String
}, 
data() {
  return {
      juegosVideo:JSON.parse(this.juegos),
      tituloRespuesta:"Elegí una opción",
      resultado:null,
      cantidadAciertos:null,
      timer:30,
      timerId:null,
      timeoutId:null,
  }
},
async mounted(){
  document.getElementById("respuesta").style.display = "flex";
  document.getElementById("resultado").style.visibility = "hidden";
  this.cantidadAciertos=Number(this.respuestasCorrectas);
  this.tituloRespuesta = "Elegí una opción"
  var vista = this
  vista.timer=30

  vista.timerId = setInterval(() => {vista.timer = Number(vista.timer)-1} , 1000);
    // después de 5 segundos parar
  vista.timeoutId=setTimeout(() => { clearInterval(vista.timerId); if(this.tituloRespuesta=="Elegí una opción" )vista.valida(null)} , 30000);
},
methods: {
  ejecutarTimer(){
        this.timerId = setInterval(() => {this.timer = Number(this.timer)-1} , 1000);
      // después de 5 segundos parar
        this.timeoutId =setTimeout(() => { clearInterval(this.timerId);if(!this.resultado)this.validar()}, 30000);
  },
  avanzar() {
      console.log("avanzar");
      console.log(this.juegosVideo)
      console.log(this.index+1);
      console.log(this.juegosVideo[Number(this.index)+1])
      console.log("cantidad aciertos " +this.cantidadAciertos )
      document.getElementById("iconoRespuesta").classList.remove("fa-circle-check");
      document.getElementById("iconoRespuesta").classList.remove("iconoIncorrecto");
      document.getElementById("iconoRespuesta").classList.remove("iconoCorrecto");
      document.getElementById("iconoRespuesta").classList.remove("fa-circle-xmark");
      this.timer = 30
      var opciones = this.juegosVideo[this.index].options;
      var botones = document.getElementsByClassName("buttonLista");
      for(var j = 0 ; j < opciones.length ; j++){
        botones.item(j).disabled =false;
        botones.item(j).classList.remove("buttonDisabled")
        botones.item(j).classList.remove("correcto")
        botones.item(j).classList.remove("incorrecto")
      }
      if(this.juegosVideo.length == Number(this.index)+1){
          document.getElementById("respuesta").style.display = "none";
          document.getElementById("resultado").style.visibility = "hidden";  
          this.$router.push({name:"PracticaResultados",params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, respuestasCorrectas: Number(this.cantidadAciertos)  }}) 
      }else{
          if(this.juegosVideo[Number(this.index)+1].name == "Escribi la seña"){
              document.getElementById("respuesta").style.display = "flex";
              document.getElementById("resultado").style.visibility = "hidden";
              this.resultado = "";
              this.respuesta = "";
              this.$router.push({name: "PracticaEscribi" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: Number(this.cantidadAciertos) , ruta: this.obtenerSiguienteRuta()}})
          }
          if(this.juegosVideo[Number(this.index)+1].name == "Adiviná la seña"){
            //escribir codigo
              document.getElementById("respuesta").style.display = "flex";
              document.getElementById("resultado").style.visibility = "hidden";
              this.resultado = "";
              this.respuesta = "";
              this.tituloRespuesta = "Elegí una opción"
              this.ejecutarTimer()
              this.$router.push({name: "PracticaAdivina" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: Number(this.cantidadAciertos) , ruta: this.obtenerSiguienteRuta()}})

              //escribir codigo
          }
          if(this.juegosVideo[Number(this.index)+1].name == "Signá la palabra"){
              //escribir codigo
              document.getElementById("respuesta").style.display = "flex";
              document.getElementById("resultado").style.visibility = "hidden";
              this.resultado = "";
              this.respuesta = "";
              this.tituloRespuesta = "Elegí una opción"
              this.$router.push({name: "PracticaSigna" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: Number(this.cantidadAciertos) , ruta: this.obtenerSiguienteRuta()}})

          } 
      }       
  },
  valida(index){
      //this.showModal = true
      clearTimeout(this.timeoutId)
      clearInterval(this.timerId)
      var opciones = this.juegosVideo[this.index].options;
      var botones = document.getElementsByClassName("buttonLista");
      this.cantidadAciertos=Number(this.respuestasCorrectas);
      for(var j = 0 ; j < opciones.length ; j++){
        botones.item(j).disabled =true;
        botones.item(j).classList.add("buttonDisabled") 
      }
      var correcto = index==null? false : opciones[index].correct;
      if(correcto){
        botones.item(index).classList.add("correcto")
        this.tituloRespuesta = "¡Respuesta correcta!"
        this.cantidadAciertos = Number(this.respuestasCorrectas)+1;
        document.getElementById("iconoRespuesta").classList.add("iconoCorrecto");
        document.getElementById("iconoRespuesta").classList.add("fas")
        document.getElementById("iconoRespuesta").classList.add("fa-solid");
        document.getElementById("iconoRespuesta").classList.add("fa-circle-check");
      }else{
        this.tituloRespuesta = "¡Respuesta incorrecta!" 
        document.getElementById("iconoRespuesta").classList.add("iconoIncorrecto");
        document.getElementById("iconoRespuesta").classList.add("fas")
        document.getElementById("iconoRespuesta").classList.add("fa-solid");
        document.getElementById("iconoRespuesta").classList.add("fa-circle-xmark");

        for(var i = 0 ; i < opciones.length ; i++){
          if(index==null){
            if(!opciones[i].correct) botones.item(i).classList.add("incorrecto");
          }else{
            botones.item(index).classList.add("incorrecto")
          }
          if(opciones[i].correct){
            botones.item(i).classList.add("correcto")
          }
        }
      }

      document.getElementById("resultado").style.visibility = "visible";
  },
  volverMenu(){
      this.$router.push("/AppHome")
  },
  volverAprendizaje(){
      this.$router.push("/aprendizajeCategorias")
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
  volverCategoria(){
      this.$router.push("/practicaCategorias")
  }
}
}
</script>

<style scoped>

.buttonLista{
  background-color: #2673e4;
}

p{
  font-size: 28px;
  
}

ul{
    text-align: left;
    display:inline-block;
    list-style:none;
    margin-top:15px;
    margin-bottom:60px;
    justify-content: center;
    font-size: 100px;
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
  font-size: 1.8rem;
  padding: .5em 1em;
  border-radius: .3em;
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
  width: 1300px;
  height: 20rem;
  max-width: auto;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background-color: #eaf4ff;
  z-index: 999;
  transform: none;
}
.buttonLista{
  width:80%;
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

.buttonDisabled{
  cursor:not-allowed
}

.resultado_texto{
  font-size: x-large;
  font-weight: bolder;
  font-style: italic;
  text-align: center;
  margin: 25px;
}

.correcto{
  background-color: darkgreen;
}
.incorrecto{
  background-color: darkred;
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
.containerRespuestas{
  display: flex;
  flex-direction: column;
  margin-bottom: 5vh; 
  text-align: center;
}

.container_video_flechas {
  margin: 10px auto;
  display: flex;
  justify-content: space-evenly !important;
  margin-bottom: 120px;
}

.adivina{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 25%;
  text-align: center;
  align-self: baseline;
}

.iconoIncorrecto{
  width: 30px;
  height: 30px;
  font-size: 40px;
  color: darkred;
  margin-bottom: 30px;
}
#iconoRespuesta{
  width: 30px;
  height: 30px;
  font-size: 40px;
}

.iconoCorrecto{
  width: 30px;
  height: 30px;
  font-size: 40px;
  color: darkgreen;
  margin-bottom: 30px;
}


.adivina span{
  font-size: x-large;
  font-weight: bolder;
  padding: 0px 25px;
  padding-bottom: 15px;
  font-style: italic;
  min-width: 260px;
}

.adivina div{
  width: 100%;
}

button{
  width: 80%;
  padding: 10px;
  margin: 8px auto;
}

#resultadosFinales{
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input{
  margin: 15px;
  width: 80%;
  background: white;
  text-align: center;
  font-size: x-large;
}

.body_aprendizaje_video {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.section_aprendizaje_video {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;
}

.container_flecha {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100px;
  font-size: 80px;
  margin-top: auto;
  margin-bottom: 50vh;


}

.container_video {
  width: 65vw;
  height: 65vh;
  display: flex; 
  justify-content: center;

}

.video {
  width: 100%;
  height: 100%;
}

.container_flecha a {
  margin: auto;
}

.flecha {
  color: #2673E4;
}

.flecha:hover {
  color: #184a94;
}

#titulo_senia {
  text-align: center;
}

@media only screen and (max-width:1300px){
  button{
    padding: 8px;
    font-size: small;
    margin: 5px auto
  }
  .containerRespuestas{
    margin-bottom: 4vh; 
  }
  .adivina{
    margin-bottom: 25px;
  }
  .container_video {
        width: 60vw;
        height: 60vh;
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
    }
}
</style>
