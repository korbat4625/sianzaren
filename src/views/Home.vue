<template>
  <b-container class="pageHome">
    <b-row>
      <b-col cols="9"><ArticleList/></b-col>
      <b-col cols="3"><Recently/></b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import ArticleList from '@/components/ArticleList.vue'
import Recently from '@/components/Recently.vue'

export default {
  name: 'Home',
  components: {
    ArticleList,
    Recently
  }
}
</script>

<style lang="scss" scoped>
</style>
