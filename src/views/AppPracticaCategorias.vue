<template>
  <section>
    <div>
      <h1>Sección Práctica</h1>
    </div>
    <div>
      <h3>Categorías</h3>
    </div>
    <div class="containerCategorias" >
      <div class="categoria" v-for="(categoria, index) in categorias" v-bind:key="index">
        <router-link :to="{name: 'PracticaSenias', params: {categoria: categoria.nombre}}"><span>{{categoria.nombre}}</span></router-link>
        <router-link :to="{name: 'PracticaSenias', params: {categoria: categoria.nombre}}" class="categoria_enlace_imagen">
          <img :src="categoria.pathImg" :alt="categoria.nombre" :title="categoria.nombre" class="categoria_imagen">
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'app-practica-categorias',
  data () {
    return {
      categorias: [
        {nombre: 'Abecedario', pathImg: require('../assets/abecedario.png'), habilitada: true},
        {nombre: 'Colores', pathImg: require('../assets/colores.png'), habilitada: true},
        {nombre: 'Comidas', pathImg: require('../assets/comidas.png'), habilitada: true},
        {nombre: 'Geografía', pathImg: require('../assets/geografia.png'), habilitada: true},
        {nombre: 'Modales', pathImg: require('../assets/modales.png'), habilitada: true},
        {nombre: 'Números', pathImg: require('../assets/numeros.png'), habilitada: true},
        {nombre: 'Personas', pathImg: require('../assets/personas.png'), habilitada: true},
        {nombre: 'Preguntas', pathImg: require('../assets/preguntas.png'), habilitada: true},
        {nombre: 'Verbos', pathImg: require('../assets/verbos.png'), habilitada: true}
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

.categoria {
  width: 250px;
  height: 250px;
  margin: 15px;
  /* background-color: burlywood;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1% 2.5%;
}

.categoria a {
  text-align: center;
  text-decoration: none;
  font-size: large;
  color: black;
  font-weight: bold;
}

.categoria button:hover {
  background-color: rgba(0, 0, 0, 0);
}

.containerCategorias {
  display: flex;
  justify-content: space-evenly;
  justify-items: left;
  flex-wrap: wrap;
  margin: auto;
  max-width: 1920px;
}

.categoria_imagen {
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 500px;
  border: 1px solid black;
  background-color: white;
}

.categoria_enlace_imagen {
  width: 80%;
  height: 80%;
  margin: auto;
  border-radius: 500px;
}
</style>
