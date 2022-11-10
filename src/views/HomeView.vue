<template >
  <div class="hello">
    <div class="container_logo">
      <h1>Bienvenidos</h1>
      <v-img src="../assets/icono.png" alt="Instructor LSA" title="Instructor LSA" class="logo"> </v-img>
      <h3 class="slogan">¿Qué esperás para practicar Lengua de Señas Argentina como nunca antes?</h3>
    </div>
    <div class="container_boton_inicio">
      <button v-on:click='handleSignIn' class="botonMenu"><b style="color:white"> Iniciar Sesión con Google </b></button>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  props: {
    msg: String
  },
  data() {
    return {
      user: '',
    }
  },
  mounted(){
    //console.log( !!localStorage.getItem('mailAccount') )
    if(localStorage.getItem('mailAccount')){
      this.$router.push('/AppHome')
    }
    if (localStorage.getItem('reloaded')) {
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
  },
  methods: {
    async handleSignIn() {
      try {
        console.log(this.$gAuth)
        const googleUser = await this.$gAuth.signIn();
        const token = googleUser.getId().substring(0,35)
        console.log(token)
        if (!googleUser) {
          return null;
        }
        this.user = googleUser.getBasicProfile().getEmail();
        localStorage.setItem('googleAccount', googleUser)
        localStorage.setItem('mailAccount', this.user)
        localStorage.setItem('token', token)
        var nombre = googleUser.getBasicProfile().gZ
        var apellido = googleUser.getBasicProfile().tX
        var json_data = {
          "email": localStorage.getItem('mailAccount'),
          "token": token ,
          "firstName": nombre != null ? nombre : 'NoName',
          "lastName": apellido != null ? apellido : 'NoLastName'
      }
        await axios.post('https://instructorlsa.herokuapp.com/login/', json_data).then(function(response){
          console.log(response);
        })
        .catch(function(error){
          if(error.response.status === 500){
            console.log('ERROR 500')
            localStorage.removeItem('mailAccount');
            localStorage.removeItem('googleAccount');
            localStorage.removeItem('token');
        }
          localStorage.removeItem('mailAccount');
          localStorage.removeItem('googleAccount');
          localStorage.removeItem('token');
          console.log(error);
        })
        if (localStorage.getItem('token') == token){
          this.$router.push('/AppHome');
          location.reload()
        }else{
          this.$router.push('/ErrorServer');
        }

      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
  setup() {
    const Vue3GoogleOauth = inject('Vue3GoogleOauth');
    
    return {
      Vue3GoogleOauth,
    };
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.botonMenu{
    width: 25vw;
    height: 4vw;
    min-height: 45px;
    min-width: 250px;
    max-width: 350px;
    max-height: 55px;
    margin: 10px 0px;
    background-color: #2673e4;
}
h1{
  text-align: center;
}

.slogan{
  text-align: center;
  font-size: x-large;
  margin: 0;
  margin-bottom: 20px;
  font-weight: 700;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.nav_menu_item{
  display: none;
}

.hello{
  position: relative;
  width: 100vw;
  height: 85vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #EAF4FF;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.logo{
  width: 250px;
  height: 250px;
  margin: 50px;
  object-fit: contain;
  border-radius: 500px;
}

.container_boton_inicio{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container_logo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.boton_inicio{
  min-width: 300px;
  max-width: 500px;
  margin: 15px;
  min-height: 50px;
}

    @media only screen and (max-width:1350px){
      .logo{
        width: 200px;
        height: 200px;
        margin: 20px;
      }
    }

</style>