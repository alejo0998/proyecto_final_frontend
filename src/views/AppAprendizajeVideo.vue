<template>
    <div>
        <div>
            <h1 id="titulo_senia">{{seniasVideo[index].nombre}}</h1>
        </div>
        <div class="container_video_flechas">
            <div class="container_flecha"><a @click="anteriorSenia(index)"><i class="fas fa-solid fa-angle-left flecha"></i></a></div>
            <div class="container_video">
                <iframe :src="seniasVideo[index].url+'?vq=hd1080'" allow="autoplay"
                    class="video"></iframe>
            </div>
            <div class="container_flecha"><a @click="proximaSenia(index)"><i class="fas fa-solid fa-angle-right flecha"></i></a></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app-aprendizaje-video',
  props: {
    senias: String,
    categoriaVideo: String,
    index: Number
  },
  data() {
    return {
        seniasVideo:JSON.parse(this.senias)
    }
  },
  mounted() {
    const token = localStorage.getItem("token")
    
    if (!token) {
        return null;
    }
    var idSenia = this.seniasVideo[this.index].id;
    console.log("token a mandar: " + token)
    console.log("Seña a mandar: " + idSenia)
    var json_data = {
        idSign: idSenia
      }
    axios.post('https://instructorlsa.herokuapp.com/sign/' , json_data, {
      headers: {
        'Authorization': 'Token '+token
      }
    }).then(function(response){
        console.log(response);
    })
    .catch(function(error){
        if(error.response.status === 500){
        console.log('ERROR 500')
    }
        console.log(error);
    })
  },
  methods: {
    anteriorSenia(i){
        var anterior = Number(i)-1
        var resultado = (this.seniasVideo.length + anterior) % this.seniasVideo.length
        const token = localStorage.getItem("token")
    
        if (!token) {
            return null;
        }
        var idSenia = this.seniasVideo[resultado].id;
        console.log("token a mandar: " + token)
        console.log("Seña a mandar: " + idSenia)
        var json_data = {
            idSign: idSenia
        }
        axios.post('https://instructorlsa.herokuapp.com/sign/' , json_data, {
        headers: {
            'Authorization': 'Token '+token
        }
        }).then(function(response){
            console.log(response);
        })
        .catch(function(error){
            if(error.response.status === 500){
            console.log('ERROR 500')
        }
            console.log(error);
        })
        this.$router.push({name: 'AprendizajeVideo' , params: {seniasVideo:JSON.stringify(this.seniasVideo) ,categoriaVideo: this.categoriaVideo , index: resultado}})
    },
    proximaSenia(i){
        var anterior = Number(i)+1
        var resultado = (this.seniasVideo.length + anterior) % this.seniasVideo.length
        const token = localStorage.getItem("token")
    
        if (!token) {
            return null;
        }
        var idSenia = this.seniasVideo[resultado].id;
        console.log("token a mandar: " + token)
        console.log("Seña a mandar: " + idSenia)
        var json_data = {
            idSign: idSenia
        }
        axios.post('https://instructorlsa.herokuapp.com/sign/' , json_data, {
        headers: {
            'Authorization': 'Token '+token
        }
        }).then(function(response){
            console.log(response);
        })
        .catch(function(error){
            if(error.response.status === 500){
            console.log('ERROR 500')
        }
            console.log(error);
        })
        console.log(resultado)
        this.$router.push({name: 'AprendizajeVideo' , params: {seniasVideo:JSON.stringify(this.seniasVideo) ,categoriaVideo: this.categoriaVideo , index: resultado}})
    },
    guardarVideo(){
        console.log("prueba si anda")
    },
    pruebaClick(){
        console.log("PRUEBA")
    }
  }
}
</script>

<style>
.container_flecha a i{
    cursor: pointer;
}
#titulo_senia {
    text-align: center;
}

.container_video_flechas {
    margin: 25px auto;
    display: flex;
    justify-content: center;
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
    width: 75vw;
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
            margin-top: 40px;

        
    }
}
</style>
