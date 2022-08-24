<template>
  <div class="hello">
    <h1>Instructor LSA</h1>
    <h2 v-if='user'>Usuario: {{ user }}</h2>

    <button @click='handleSignIn' :disabled='!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized'>Iniciar sesión</button>
    <button @click='handleSignOut' :disabled='!Vue3GoogleOauth.isAuthorized'>Cerrar sesión</button>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: 'HelloWorld',
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
        //console.log(googleUser)
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
  /*
  if(!user){
    this.$Router.push('/home')
  }*/

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
</style>