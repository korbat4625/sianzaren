<template>
  <b-container>
     <b-card-group>
      <b-card title="Title" sub-title="title will lost" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
        <b-card-text>
          This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.
        </b-card-text>
        <template v-slot:footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>

      <b-card title="Title" sub-title="title will lost" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
        <b-card-text>
          This card has supporting text below as a natural lead-in to additional content.
        </b-card-text>
        <template v-slot:footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>

      <b-card title="Title" sub-title="title will lost" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
        <b-card-text>
          This is a wider card with supporting text below as a natural lead-in to additional content.
          This card has even longer content than the first to show that equal height action.
        </b-card-text>
        <template v-slot:footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import firebase from '../Model/FirebaseModel.vue'
export default {
  mixins: [firebase]
}
</script>
