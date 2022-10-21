<template>
  <div>
      <PhotoCapture v-model="imageBase64" />
      <VideoCapture uploadUrl="localhost:8080" v-model="videoUrl" />
  </div>
</template>

<script>
import {PhotoCapture, VideoCapture} from 'vue-media-recorder'

export default {
  name: 'app-prueba',
  data(){
      return {
          imageBase64: null,
          videoUrl: null,
      }
  },
  components:{
      PhotoCapture,
      VideoCapture
  }
}
</script>