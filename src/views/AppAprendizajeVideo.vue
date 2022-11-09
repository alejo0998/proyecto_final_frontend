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

<style scoped>
.container_flecha a i{
    cursor: pointer;
}
#titulo_senia {
    text-align: center;
}

.container_video_flechas {
    margin: 10px auto;
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
    margin: 10px auto;
    display: flex;
    justify-content: center;
}

.container_flecha {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100px;
    font-size: 80px;
    
    
    align-self: center;


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
@media only screen and (max-width:1350px){
    .video {
        width: 60vw;
        height: 60vh;
        margin-bottom: 25px;
    }
}
</style>
