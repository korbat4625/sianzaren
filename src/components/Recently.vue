<template>
  <div class="recentlyArticle">
    <b-list-group>
      <b-list-group-item @click="chooseTagDispose='all'" button>
        所有文章
      </b-list-group-item>
      <b-list-group-item @click="chooseTagDispose=tag" v-for="tag in tags" :key="tag" class="d-flex justify-content-between align-items-center" button>
        {{ tag }}
      </b-list-group-item>
    </b-list-group>
    <slot v-show="false" name="chooseTagDispose" :chooseTagDispose="chooseTagDispose"></slot>
  </div>
</template>

<script>
export default {
  name: 'Recently',
  props: ['tags'],
  data () {
    return {
      chooseTagDispose: null
    }
  }
}
</script>

<style lang="scss">
  .recentlyArticle {
    border: solid 1px #444;
    border-radius: 5px;
    margin-top: 4rem;
    .recentlyArticle__content {
      height: 600px;
    }
  }
</style>
