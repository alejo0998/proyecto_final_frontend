<template>
    <div>
        <div>
            <h1 id="titulo_senia">Escribí la seña</h1>
        </div>
        <div class="container_video_flechas">
            <div class="container_video">
                <iframe  :src="juegosVideo[index].sign.urlVideo+'?controls=0'" allow="autoplay" allowfullscreen="false" aria-setsize="1920px"
                    class="video"></iframe>
            </div>
            <div id="respuesta" class="escribi">
                <input type="text" v-model="respuesta" placeholder="Ingresá la palabra">
                <button @click="validar" class="buttonLista" >Aceptar</button>
                <h3 id="timer">Tiempo disponible: {{timer}}</h3>
            </div>
            <div id="resultado">
                <span class="resultado_texto"> {{resultado}}</span>
                <div>
                  <i id="iconoRespuesta" v-show="!!resultado"></i>
                </div>
                <button @click="avanzar">Continuar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app-practica_escribi',
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
        respuesta:"",
        resultado:null,
        cantidadAciertos:null,
        timer:30,
        timerId:null,
        timeoutId:null
    }
  },/*
  setup(){
    var vista = this
    vista.timer=30
    let timerId = setInterval(() => {vista.timer = Number(vista.timer)-1} , 1000);
      // después de 5 segundos parar
    setTimeout(() => { clearInterval(timerId)}, 30000);
  },*/
  async mounted(){
    document.getElementById("respuesta").style.display = "flex";
    document.getElementById("resultado").style.display = "none";
    this.cantidadAciertos=Number(this.respuestasCorrectas);
    this.resultado = null;
    var vista = this
    vista.timer=30
    vista.timerId = setInterval(() => {vista.timer = Number(vista.timer)-1} , 1000);
      // después de 5 segundos parar
    vista.timeoutId = setTimeout(() => { clearInterval(vista.timerId);if(!vista.resultado)vista.validar()}, 30000);
  },
  methods: {
    ejecutarTimer(){
        this.timerId = setInterval(() => {this.timer = Number(this.timer)-1} , 1000);
      // después de 5 segundos parar
        this.timeoutId =setTimeout(() => { clearInterval(this.timerId);if(!this.resultado)this.validar()}, 30000);
    },
    validar() {
        clearTimeout(this.timeoutId)
        clearInterval(this.timerId)
        this.cantidadAciertos=Number(this.respuestasCorrectas)
        document.getElementById("respuesta").style.display = "none";
        document.getElementById("resultado").style.display = "flex";

        var respSinAcentos = this.quitarAcentos(this.respuesta.toUpperCase().trim())

        if(respSinAcentos == this.juegosVideo[this.index].sign.name.toUpperCase()){
            this.resultado = "¡Respuesta correcta!"
            document.getElementById("iconoRespuesta").classList.add("iconoCorrecto");
            document.getElementById("iconoRespuesta").classList.add("fas")
            document.getElementById("iconoRespuesta").classList.add("fa-solid");
            document.getElementById("iconoRespuesta").classList.add("fa-circle-check");
            this.cantidadAciertos = Number(this.respuestasCorrectas)+1;
        }else{
            this.resultado = "¡Respuesta incorrecta!";
            document.getElementById("iconoRespuesta").classList.add("iconoIncorrecto");
            document.getElementById("iconoRespuesta").classList.add("fas")
            document.getElementById("iconoRespuesta").classList.add("fa-solid");
            document.getElementById("iconoRespuesta").classList.add("fa-circle-xmark");
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
    avanzar() {
        console.log("avanzar");
        console.log(this.juegosVideo)
        console.log(this.index+1);
        console.log("cantidad aciertos " + this.cantidadAciertos);
        console.log(this.juegosVideo[Number(this.index)+1])
        document.getElementById("iconoRespuesta").classList.remove("fa-circle-check");
        document.getElementById("iconoRespuesta").classList.remove("iconoIncorrecto");
        document.getElementById("iconoRespuesta").classList.remove("iconoCorrecto");
        document.getElementById("iconoRespuesta").classList.remove("fa-circle-xmark");
        this.timer=30
        if(this.juegosVideo.length == Number(this.index)+1){
            document.getElementById("respuesta").style.display = "none";
            document.getElementById("resultado").style.display = "none";
            this.$router.push({name:"PracticaResultados",params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, respuestasCorrectas: Number(this.cantidadAciertos) }}) 
        }else{
            if(this.juegosVideo[Number(this.index)+1].name == "Escribi la seña"){
                document.getElementById("respuesta").style.display = "flex";
                document.getElementById("resultado").style.display = "none";
                this.resultado = "";
                this.respuesta = "";
                this.ejecutarTimer();
                this.$router.push({name: "PracticaEscribi" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: Number(this.cantidadAciertos) , ruta: this.obtenerSiguienteRuta()}})
            }
            if(this.juegosVideo[Number(this.index)+1].name == "Adiviná la seña"){
                //escribir codigo
                document.getElementById("respuesta").style.display = "flex";
                document.getElementById("resultado").style.display = "none";
                this.resultado = "";
                this.respuesta = "";
                this.$router.push({name: "PracticaAdivina" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: Number(this.cantidadAciertos) , ruta: this.obtenerSiguienteRuta()}})
            }
            if(this.juegosVideo[Number(this.index)+1].name == "Signá la palabra"){
                //escribir codigo
                document.getElementById("respuesta").style.display = "flex";
                document.getElementById("resultado").style.display = "none";
                this.resultado = "";
                this.respuesta = "";
                this.$router.push({name: "PracticaSigna" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: Number(this.cantidadAciertos) , ruta: this.obtenerSiguienteRuta()}})
            } 
        }       
    },
    async volverPracticar(){
      var url_get = 'https://instructorlsa.herokuapp.com/practice/games/?categoryName='+this.categoriaVideo
      var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
      var tokenSend = 'Token '+token
      let response = await axios.get(url_get, {
        headers: {
          'Authorization': tokenSend
        }
      })
      var juegos = response.data
      this.siguienteJuego(this.categoriaVideo, juegos)
      console.log(response.data)
    },
    siguienteJuego(cat , juegos ){
      this.timer=30
      if(juegos[0].name == "Escribi la seña"){
        document.getElementById("respuesta").style.display = "flex";
        document.getElementById("resultado").style.display = "none";
        this.$router.push({name: "PracticaEscribi" , params:{juegos: JSON.stringify(juegos), categoriaVideo: cat, index: 0, respuestasCorrectas: 0} })
      }
      if(juegos[0].name == "Adivina la seña"){
        //escribir codigo
        document.getElementById("respuesta").style.display = "flex";
        document.getElementById("resultado").style.display = "none";
        this.$router.push({name: "PracticaAdivina" , params:{juegos: JSON.stringify(juegos), categoriaVideo: cat, index: 0, respuestasCorrectas: 0} })

      }
      if(juegos[0].name == "Signá la palabra"){
        //escribir codigo
        document.getElementById("respuesta").style.display = "flex";
        document.getElementById("resultado").style.display = "none";
        this.$router.push({name: "PracticaSigna" , params:{juegos: JSON.stringify(juegos), categoriaVideo: cat, index: 0, respuestasCorrectas: 0} })
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
    quitarAcentos(cadena){
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    }
  }
}
</script>

<style scoped>
#titulo_senia {
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
#resultado{
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.resultado_texto{
    font-size: x-large;
    font-weight: bolder;
    font-style: italic;
    text-align: center;
    margin: 25px;
}

.container_video_flechas {
    margin: 10px auto;
    display: flex;
    justify-content: space-evenly !important;
}

.escribi{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

button{
    width: 80%;
    padding: 10px;
    margin: 10px auto;
}
.buttonLista{
  background-color: #2673e4;
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

.container_video_flechas {
    margin: 10px auto;
    display: flex;
    justify-content: center;
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
    margin-bottom: 25px;

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
.iconoIncorrecto{
  width: 30px;
  height: 30px;
  font-size: 40px;
  color: darkred;
  margin-bottom: 30px;
}

.iconoCorrecto{
  width: 30px;
  height: 30px;
  font-size: 40px;
  color: darkgreen;
  margin-bottom: 30px;
}

@media only screen and (max-width:1350px){
    .container_video {
        width: 60vw;
        height: 60vh;
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
    }
    button{
      padding: 8px;
      font-size: small;
      margin: 5px auto
    }  
}
</style>
