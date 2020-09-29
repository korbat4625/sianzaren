<template>
  <b-row>
    <b-col cols="4">
      <label>文章列表:</label>
      <b-list-group>
        <b-list-group-item
          button
          v-for="post in posts"
          :key="post.id"
          @click="putArticle(post)"
        >
          {{ post.title }}
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col cols="8">
      <AddArticle
        :editTitle="editTitle"
        :editValue="editValue"
        :id="id"
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
      editTitle: '',
      editValue: '',
      id: ''
    }
  },
  components: {
    AddArticle
  },
  created () {
    this.F_getCollectionDocsSort('posts', { where: 'createdAt', order: 'desc' }).then(docs => {
      this.posts = docs
    })
  },
  methods: {
    putArticle (articleInfo) {
      this.editTitle = articleInfo.title
      this.editValue = articleInfo.value
      this.id = articleInfo.id
    }
  }
}
</script>
