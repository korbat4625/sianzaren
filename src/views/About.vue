<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { storage } from '../Model/FirebaseModel.js'
export default {
  name: 'About',
  data () {
    return {
    }
  },
  created () {
    var pathReference = storage.ref()
    pathReference.child('managers/allen.PNG').getDownloadURL().then(function (url) {
      var xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = function (event) {
        var blob = xhr.response
        console.log(blob)
      }
      xhr.open('GET', url)
      xhr.send()

      // Or inserted into an <img> element:
      var img = document.getElementById('myimg')
      img.src = url
      console.log(img)
    }).catch(function (error) {
      // Handle any errors
      console.log(error)
    })
  }
}
</script>
