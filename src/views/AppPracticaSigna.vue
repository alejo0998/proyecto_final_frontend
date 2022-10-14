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
        <button id="botonSaltear" @click="avanzar">Saltear juego</button> 
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
</template>

<script>
import axios from 'axios'
export default{
  name: 'app-practica-signa',
  props:{
    juegos: String,
    categoriaVideo: String,
    index: Number,
    respuestasCorrectas: Number
  },
  data(){
    return {
      video:null,
      datos:[],
      timer:5,
      timerGrabando:4,
      juegosVideo:JSON.parse(this.juegos),
      resultado:null,
      cantidadAciertos:null
    }
  },
  mounted(){
    this.video = document.querySelector("#video");
    let datos = [];
    let mediaRecorder=null;
    var vista = this;
    let blob = null
    document.querySelector("#botonAbrirCamara").addEventListener("click", function(){
      navigator.mediaDevices.getUserMedia({video:{ width: 405, height: 720 }}).then(mostrarVideo).catch(err => console.log(err))
    })
    
    document.getElementById("post_grabacion").style.display="none";
    document.getElementById("timer").style.display="none";
    document.getElementById("grabando").style.display="none";
    document.getElementById("resultados_grabación").style.display="none";
    
    document.querySelector("#botonGrabar").addEventListener("click",grabarConRetraso)
    document.querySelector("#botonReintentar").addEventListener("click",grabarConRetraso)
    document.querySelector("#botonContinuar").addEventListener("click",enviarVideo)
    
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
        blob = new Blob(datos , {type:"video/mp4"});
        datos=[];
        console.log(blob)
        console.log("finaliza grabacion");
        document.getElementById("video").style = "border:none";
        document.getElementById("post_grabacion").style.display="flex";
        //download(blob)
      }
    }
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
      setTimeout(()=> mediaRecorder.stop() , 4000);
    }
    //aca deberia enviar el video
    function enviarVideo(){
      const formData = new FormData();

      const myFile = new File(
          [blob],
          "demo.mp4",
          { type: 'video/mp4' }
      );

      console.log(myFile)
      formData.append("video", myFile);
      console.log("envio video");
      var correcto = null
      //enviar video


      
      var url_get = 'http://127.0.0.1:5000/send_video'
      var token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '123';
      var tokenSend = 'Token '+token
      axios.get(url_get, {
        headers: {
          'Authorization': tokenSend
        }
      }).then(response => correcto = response.data)

      //Mostrar resultados
      if(correcto){
        vista.resultado = "¡Respuesta correcta!"
        vista.cantidadAciertos = Number(vista.respuestasCorrectas)+1;
      }else{
        vista.resultado = "¡Respuesta incorrecta!"  
      }
      document.getElementById("resultados_grabación").style.display="block";
      document.getElementById("post_grabacion").style.display="none";
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
    ponerSoloLectura(campo,soloLectura){
      document.getElementById(campo).readOnly = soloLectura;
      if(soloLectura){
        document.getElementById(campo).style.cursor = "notAllowed"
      }else{
        document.getElementById(campo).style.cursor = "pointer"
      }
    },
    avanzar(){
      console.log("avanzar");
      console.log(this.juegosVideo)
      console.log(this.index+1);
      console.log(this.juegosVideo[Number(this.index)+1])
      console.log(this.respuestasCorrectas)
      document.getElementById("post_grabacion").style.display="none";
      document.getElementById("timer").style.display="none";
      document.getElementById("grabando").style.display="none";
      document.getElementById("resultados_grabación").style.display="none";
      document.getElementsByClassName("cont_signa_video")[0].style.display = "none";
      document.getElementsByClassName("cont_signa_explicacion")[0].style.display = "block";
      document.getElementById("botonAbrirCamara").style.display = "block";
      document.getElementById("botonSaltear").style.display = "block";
      this.video.srcObject.getTracks().forEach( track => track.stop() ); // stop each of them


      if(this.juegosVideo.length == Number(this.index)+1){ 
          this.$router.push({name:"PracticaResultados",params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, respuestasCorrectas: this.cantidadAciertos }}) 
      }else{
          if(this.juegosVideo[Number(this.index)+1].name == "Escribi la seña"){
              this.$router.push({name: "PracticaEscribi" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: this.cantidadAciertos}})
          }
          if(this.juegosVideo[Number(this.index)+1].name == "Adiviná la seña"){
              this.$router.push({name: "PracticaAdivina" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: this.cantidadAciertos}})
          }
          if(this.juegosVideo[Number(this.index)+1].name == "Signá la palabra"){
              this.$router.push({name: "PracticaSigna" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1, respuestasCorrectas: this.cantidadAciertos}})
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

