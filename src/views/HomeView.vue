<template >
  <div class="hello">
    <div class="container_logo">
      <h1>Instructor LSA</h1>
      <img src="../assets/icono.png" alt="Instructor LSA" title="Instructor LSA" class="logo">
      <h3>Aprendé, jugá, incluí</h3>
    </div>
    <h2 v-if='user'>Usuario: {{ user }}</h2>
    <div class="container_boton_inicio">
      <button @click='handleSignIn' :disabled='!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized' class="boton_inicio">Iniciar sesión</button>
      <button @click='handleSignOut' :disabled='!Vue3GoogleOauth.isAuthorized' class="boton_inicio" >Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
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
  methods: {
    async handleSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        // console.log(this.$gAuth.signIn);
        if (!googleUser) {
          return null;
        }
        this.user = googleUser.getBasicProfile().getEmail();
        console.log(googleUser)
        this.$router.push('/AppHome')
        localStorage.setItem('googleAccount', googleUser)
      } catch (error) {
        console.log(error);
        return null;
      }
      
    },
    async handleSignOut() {
      try {
        await this.$gAuth.signOut();
        // console.log(this.$gAuth.signOut);
        this.user = '';
      } catch (error) {
        console.log(error);
      }
    }
  },
  setup() {
    const Vue3GoogleOauth = inject('Vue3GoogleOauth');
    return {
      Vue3GoogleOauth,
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  text-align: center;
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

.hello{
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #EAF4FF;
  display: flex;
  justify-content: space-evenly;
}
.logo{
  width: 300px;
  height: 300px;
  object-fit: contain;
  border-radius: 500px;
}

.container_boton_inicio{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.container_logo{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.boton_inicio{
  min-width: 250px;
  max-width: 500px;
  margin: 15px;
  min-height: 50px;
}
</style>