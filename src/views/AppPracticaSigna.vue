<template>
  <div class="cont_principal_signa">
    <div class="cont_titulo_signa">
      <h1>Signá la Palabra</h1>
    </div>
    <div class="cont_signa">
      <div class="cont_signa_izq">
        <div class="cont_signa_explicacion">
          <h3>Tips para grabarte</h3>
          <ul>
            <li>Recordá que las manos y la cara deben salir en la grabación en todo momento</li>
            <li>La secuencia para grabarte debería ser la siguiente: comenzar con la manos abajo, realizar la seña y luego terminar con las manos abajo</li>
            <li>Tendrás un máximo de 4 segundos para grabarte haciendo la seña</li>
            <li>Deberás alejarte de la cámara lo suficiente para que se vea desde tu cintura hasta tu cabeza</li>
          </ul>
        </div>
        <div class="cont_signa_video">
          <video autoplay id="video"></video>
        </div>
      </div>
      <div class="cont_signa_der">
        <h3>Seña a realizar:</h3>
        <h3 style="border: 0px solid black ; width: auto; margin: 5px auto ;padding-bottom: 50px ; text-align: center; font-family: cursive;">{{juegosVideo[index].sign.name}}</h3>
        <button id="botonAbrirCamara">Abrir la cámara</button>
        <button id="botonGrabar">Comenzar a grabar</button>
        <button id="botonSaltear" @click="avanzarSinJugar">Saltear juego</button> 
        <div id="post_grabacion">
          <h3>¿Pudiste grabarte correctamente?</h3>
          <button id="botonContinuar">Si, ver resultados</button>
          <button id="botonReintentar">No, reintentar</button>
        </div>
        <h3 id="timer">La grabación empezará en: {{timer}}</h3>
        <h3 id="grabando">Grabando: {{timerGrabando}}</h3>
        <div id="resultados_grabación">
          <h3 id="resultado">{{resultado}}</h3>
          <button @click="avanzar">Avanzar</button>
        </div>
      </div>
    </div>
  </div>
  <loading readonly v-model:active="isLoading"
               :can-cancel="false"
               :on-cancel="onCancel"
               :is-full-page="fullPage"/>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default{
  name: 'app-practica-signa',
  props:{
    juegos: String,
    categoriaVideo: String,
    index: Number,
    respuestasCorrectas: Number,
    ruta:String
  },
  components: {
          Loading
  },
  data(){
    return {
      video:null,
      datos:[],
      timer:5,
      timerGrabando:4,
      juegosVideo:JSON.parse(this.juegos),
      resultado:null,
      cantidadAciertos:null,
      blob:null,
      isLoading: false,
      fullPage: true
    }
  },
  mounted(){
    this.video = document.querySelector("#video");
    let datos = [];
    let mediaRecorder=null;
    var vista = this;
    //let blob = null
    document.querySelector("#botonAbrirCamara").addEventListener("click", function(){
      navigator.mediaDevices.getUserMedia({video:{ width: 405, height: 720 , frameRate: 8 }}).then(mostrarVideo).catch(err => console.log(err))
    })
    
    document.getElementById("post_grabacion").style.display="none";
    document.getElementById("timer").style.display="none";
    document.getElementById("grabando").style.display="none";
    document.getElementById("resultados_grabación").style.display="none";
    
    document.querySelector("#botonGrabar").addEventListener("click",grabarConRetraso)
    document.querySelector("#botonReintentar").addEventListener("click",grabarConRetraso)
    document.querySelector("#botonContinuar").addEventListener("click",vista.enviarVideo)
    
    function mostrarVideo(stream){
      document.getElementsByClassName("cont_signa_video")[0].style.display = "block";
      document.getElementsByClassName("cont_signa_explicacion")[0].style.display = "none";
      document.getElementById("botonAbrirCamara").style.display = "none";
      document.getElementById("botonGrabar").style.display = "block";
      vista.video.srcObject=stream;
      //define a media recorder
      mediaRecorder = new MediaRecorder(stream , {mimeType:'video/webm'});
      mediaRecorder.ondataavailable = function(e){
        console.log(e.data);
        datos.push(e.data);
      }
      mediaRecorder.onstop = function(){
        //alert("FINALIZÓ LA GRABACIÓN")
        vista.blob = new Blob(datos , {type:"video/mp4"});
        datos=[];
        console.log(vista.blob)
        console.log("finaliza grabacion");
        document.getElementById("video").style = "border:none";
        document.getElementById("post_grabacion").style.display="flex";
        console.log(mediaRecorder)
        /*const myFile = new File(
          [vista.blob],
          "demo.mp4",
          { type: 'video/mp4'}
        );*/
        //download(myFile)
      }
    }
    /*function download(blob){
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download","video_recorded.mp4");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }*/
    function grabarConRetraso(){
      document.getElementById("timer").style.display="block";
      document.getElementById("botonGrabar").style.display = "none";
      document.getElementById("botonSaltear").style.display = "none";
      document.getElementById("post_grabacion").style.display="none";
      datos=[];
      vista.timer=5;
      setTimeout(()=> grabar(mediaRecorder) , 5000);
      let timerId = setInterval(() => {vista.timer = Number(vista.timer)-1} , 1000);
      // después de 5 segundos parar
      setTimeout(() => { clearInterval(timerId); vista.cambiarAGrabacion()}, 5000);
    }
    function grabar(mediaRecorder){
      console.log("empieza a grabar posta");
      mediaRecorder.start();
      document.getElementById("video").style = "border:5px solid red";
      //
      setTimeout(()=> mediaRecorder.stop() , 4000);
    }
    
  },
  methods: {
    cambiarAGrabacion() {
      this.timerGrabando = 4
      document.getElementById("timer").style.display="none";
      document.getElementById("grabando").style.display="block";
      var vista = this;
      let timerId = setInterval(() => {vista.timerGrabando = Number(vista.timerGrabando)-1} , 1000);
      // después de 5 segundos parar
      setTimeout(() => { clearInterval(timerId); document.getElementById("grabando").style.display="none";}, 4000);
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
    async enviarVideo(){
      var vista = this
      const formData = new FormData();

      const myFile = new File(
          [vista.blob],
          "demo.mp4",
          { type: 'video/mp4'}
      );
      var posicion = vista.juegosVideo[vista.index].position;
      var categoria = vista.juegosVideo[vista.index].category;
      console.log("esta es mi posicion: "+posicion)
      formData.append("video", myFile);
      formData.append("position", posicion);
      formData.append("category", categoria);
      formData.append("web", true);
      console.log("envio video");
      //enviar video
      var respuesta = null
      console.log(formData)

      vista.isLoading = true; 
      var url_get = 'http://127.0.0.1:5000/send_video'
      //var url_get = 'http://18.233.165.211:8080/send_video'
      var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
      var tokenSend = 'Token '+ token
      await axios.post(url_get, formData , {
        headers: {
          'Authorization': tokenSend
        }
      }).then(response => respuesta = obtenerResponse(response))
      function obtenerResponse(r){
        console.log(r)
        respuesta = {}
        respuesta.response = r.data.response;
        respuesta.correcta = r.data.validation == "CORRECTA";
        respuesta.validation = r.data.validation;
        respuesta.prediction = r.data.prediction;
        //respuesta.indexPredict = r.data.indexPredict;
        vista.isLoading = false;
        return respuesta
      }
      
      console.log(respuesta)
      //Mostrar resultados
      vista.cantidadAciertos=Number(vista.respuestasCorrectas);
      if(respuesta.correcta){
        vista.resultado = "¡Respuesta correcta!";
        vista.cantidadAciertos = Number(vista.respuestasCorrectas)+1;
      }else{ 
        if(respuesta.validation == "INCORRECTA"){
          vista.resultado = "¡Respuesta incorrecta!";
        }else{
          vista.resultado =respuesta.response; 
        }
        
      }
      document.getElementById("resultados_grabación").style.display="block";
      document.getElementById("post_grabacion").style.display="none";
    },
    ponerSoloLectura(campo,soloLectura){
      document.getElementById(campo).readOnly = soloLectura;
      if(soloLectura){
        document.getElementById(campo).style.cursor = "notAllowed"
      }else{
        document.getElementById(campo).style.cursor = "pointer"
      }
    },
    avanzarSinJugar(){
      this.cantidadAciertos = Number(this.respuestasCorrectas)
      this.avanzar()
    },
    avanzar(){
      console.log("avanzar");
      console.log(this.juegosVideo)
      console.log(this.index+1);
      console.log(this.juegosVideo[Number(this.index)+1])
      console.log("cantidad aciertos " + this.cantidadAciertos)
      document.getElementById("post_grabacion").style.display="none";
      document.getElementById("timer").style.display="none";
      document.getElementById("grabando").style.display="none";
      document.getElementById("resultados_grabación").style.display="none";
      document.getElementsByClassName("cont_signa_video")[0].style.display = "none";
      document.getElementsByClassName("cont_signa_explicacion")[0].style.display = "block";
      document.getElementById("botonAbrirCamara").style.display = "block";
      document.getElementById("botonSaltear").style.display = "block";
      if(this.video.srcObject)
      this.video.srcObject.getTracks().forEach( track => track.stop() ); // stop each of them


      if(this.juegosVideo.length == Number(this.index)+1){ 
          this.$router.push({name:"PracticaResultados",params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, respuestasCorrectas: Number(this.cantidadAciertos) }}) 
      }else{
          if(this.juegosVideo[Number(this.index)+1].name == "Escribi la seña"){
              this.$router.push({name: "PracticaEscribi" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: Number(this.cantidadAciertos) , ruta: this.obtenerSiguienteRuta()}})
          }
          if(this.juegosVideo[Number(this.index)+1].name == "Adiviná la seña"){
              this.$router.push({name: "PracticaAdivina" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: Number(this.cantidadAciertos) , ruta: this.obtenerSiguienteRuta()}})
          }
          if(this.juegosVideo[Number(this.index)+1].name == "Signá la palabra"){
              this.$router.push({name: "PracticaSigna" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: Number(this.cantidadAciertos) , ruta: this.obtenerSiguienteRuta()}})
          } 
          console.log("no llegó")
        }
    }
  }
}
</script>

 
<style scoped>
  .cont_signa{
    display: flex;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    height: 70vh;
    margin: 3%;
  }
  .cont_signa_der{
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    margin-bottom: 80px;
    width: 49vw;
  }
  .cont_signa_izq{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    width: 49vw;
  }
  .cont_signa_explicacion{
    margin: 10% 5%;
  }

  button{
    margin: 2% auto;
    width: 50%;
  }
  .cont_signa_video{
    display: none;
    text-align: center;
  }
  #video{
    height: 70vh;
    box-shadow: 15px 15px 15px black;
  }
  .cont_signa_explicacion ul li{
    margin: 10px 0;
    font-size: x-large;
  }
  #botonGrabar{
    display: none;
  }
  #post_grabacion{
    display: none;
    flex-direction: column;
    justify-content: center;
  }

  #timer{
    color:red;
  }
  #grabando{
    color:red;
  }
</style>

