<template>
    <div>
        <div>
            <h1 id="titulo_senia">Escribí la seña</h1>
        </div>
        <div class="container_video_flechas">
            <div class="container_video">
                <iframe :src="juegosVideo[index].sign.urlVideo+'?controls=0'" allow="autoplay" allowfullscreen="false" aria-setsize="1920px"
                    class="video"></iframe>
            </div>
            <div id="respuesta" class="escribi">
                <input type="text" v-model="respuesta" placeholder="Ingrese la seña">
                <button @click="validar">Aceptar</button>
            </div>
            <div id="resultado">
                <span class="resultado_texto"> {{resultado}}</span>
                <button @click="avanzar" >Avanzar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app-practica_escribi',
  props: {
    juegos: String,
    categoriaVideo: String,
    index: Number
  },
  data() {
    return {
        juegosVideo:JSON.parse(this.juegos),
        respuesta:"",
        resultado:null
    }
  },
  mounted(){
    document.getElementById("respuesta").style.display = "flex";
    document.getElementById("resultado").style.display = "none";
  },
  methods: {
    validar() {
        console.log("Valida")
        document.getElementById("respuesta").style.display = "none";
        document.getElementById("resultado").style.display = "flex";
        if(this.respuesta.toUpperCase() == this.juegosVideo[this.index].sign.name.toUpperCase()){
            console.log("Bien")
            this.resultado = "¡Respuesta correcta!"
            if(this.juegosVideo.length == Number(this.index)+1){
                //A PANTALLA DE RESULTADOS
            }else{
                //Muestra resultado de la respuesta
            }
        }else{
            this.resultado = "¡Respuesta incorrecta!"
            console.log("Mal")
        }
    },
    avanzar() {
        console.log("avanzar");
        console.log(this.juegosVideo)
        console.log(this.index+1);
        console.log(this.juegosVideo[Number(this.index)+1])
        if(this.juegosVideo[Number(this.index)+1].name == "Escribi la seña"){
            document.getElementById("respuesta").style.display = "flex";
            document.getElementById("resultado").style.display = "none";
            this.resultado = "";
            this.respuesta = "";
            this.$router.push({name: "PracticaEscribi" , params:{juegos: JSON.stringify(this.juegosVideo), categoriaVideo: this.categoriaVideo, index: Number(this.index)+1} })
        }
        if(this.juegosVideo[Number(this.index)+1].name == "Adivina la seña"){
            //escribir codigo
        }
        if(this.juegosVideo[Number(this.index)+1].name == "Signa la palabra"){
            //escribir codigo
        }
        
    }
  }
}
</script>

<style scoped>
#titulo_senia {
    text-align: center;
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
    margin: 25px auto;
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
    margin: 25px auto;
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
}

.container_video {
    width: 60vw;
    height: 75vh;
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
        
    }
}
</style>
