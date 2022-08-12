<template>
  <section>
    <div>
      <h1>Sección Aprendizaje</h1>
    </div>
    <div>
      <h3>{{categoria}}</h3>
    </div>
    <div class="section_senias">
    <router-link v-for="(senia, index) in senias" v-bind:key="index" :to="{name: 'AprendizajeVideo' , params: {senias: senias , index: index}}" class="contenedor_senia">
      <span class="boton_senia">{{senia.nombre}}</span>
    </router-link>
  </div>
  </section>
</template>

<script>
export default {
  name: 'app-aprendizaje-senias',
  props: {
    categoria: String
  },
  data () {
    return {
      senias: [
        { id: 1, nombre: 'Hola', ruta: 'https://drive.google.com/file/d/104i7fGeVl3K_U7CjTlUeOY118-RqI_Wi/preview' },
        { id: 2, nombre: 'Chau', ruta: 'ponerRuta' },
        { id: 3, nombre: '¿Cómo Estas?', ruta: 'ponerRuta' },
        { id: 4, nombre: '¿Cómo?', ruta: 'ponerRuta' },
        { id: 5, nombre: '¿Cual?', ruta: 'ponerRuta' },
        { id: 6, nombre: '¿Donde?', ruta: 'ponerRuta' },
        { id: 7, nombre: '¿Cuando?', ruta: 'ponerRuta' },
        { id: 1, nombre: 'Hola', ruta: 'https://drive.google.com/file/d/104i7fGeVl3K_U7CjTlUeOY118-RqI_Wi/preview' },
        { id: 2, nombre: 'Chau', ruta: 'ponerRuta' },
        { id: 3, nombre: '¿Cómo Estas?', ruta: 'ponerRuta' },
        { id: 4, nombre: '¿Cómo?', ruta: 'ponerRuta' },
        { id: 5, nombre: '¿Cual?', ruta: 'ponerRuta' },
        { id: 6, nombre: '¿Donde?', ruta: 'ponerRuta' },
        { id: 7, nombre: '¿Cuando?', ruta: 'ponerRuta' },
        { id: 1, nombre: 'Hola', ruta: 'https://drive.google.com/file/d/104i7fGeVl3K_U7CjTlUeOY118-RqI_Wi/preview' },
        { id: 2, nombre: 'Chau', ruta: 'ponerRuta' },
        { id: 3, nombre: '¿Cómo Estas?', ruta: 'ponerRuta' },
        { id: 4, nombre: '¿Cómo?', ruta: 'ponerRuta' },
        { id: 5, nombre: '¿Cual?', ruta: 'ponerRuta' },
        { id: 6, nombre: '¿Donde?', ruta: 'ponerRuta' },
        { id: 7, nombre: '¿Cuando?', ruta: 'ponerRuta' }
      ]
    }
  }
}
</script>

<style>
h1{
    font-size: xx-large;
    padding: 10px 1%;
    text-align: left;
    margin: 0;
}
h3 {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  margin: 0;
  padding: 5px 1%;
}
.boton_senia {
  text-decoration: none;
}
.section_senias{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 5% auto;
}

.contenedor_senia{
  background-color: #2673E4;
  width: 200px;
  border-radius: 10px;
  height: 30px;
  text-decoration: none;
  color: white;
  font-size: larger;
  padding: 20px;
  margin: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
