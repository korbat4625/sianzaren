<template>
  <b-row>
    <b-col cols="4">
      <label>文章列表:</label>
      <b-list-group>
        <b-list-group-item
          v-for="post in posts"
          :key="post.id"
          @click.native="putArticle(post.title)"
        >
          {{ post.title }}
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col cols="8">
      <AddArticle
        :title="title"
      ></AddArticle>
    </b-col>
  </b-row>
</template>

<script>
import AddArticle from '../components/AddArticle.vue'
export default {
  name: 'ArticleEditor',
  data () {
    return {
      posts: [],
      title: ''
    }
  },
  components: {
    AddArticle
  },
  created () {
    this.F_getCollectionDocsSort('posts', { where: 'createdAt', order: 'desc' }).then(docs => {
      this.posts = docs
      console.log(this.posts)
    })
  },
  methods: {
    putArticle (articleInfo) {
      this.title = articleInfo.title
    }
  }
}
</script>

<style lang="scss">

</style>
