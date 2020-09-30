<template>
  <b-row>
    <b-col cols="4">
      <label>文章列表:</label>
      <b-list-group>
        <b-list-group-item
          button
          v-for="post in editPosts"
          :key="post.id"
          @click="putArticle(post)"
        >
          {{ post.contentData.title }}
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col cols="8">
      <AddArticle
        :editTitle="editTitle"
        :editValue="editValue"
        :id="id"
        :createdAt="createdAt"
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
      editPosts: [],
      editTitle: '',
      editValue: '',
      createdAt: null,
      id: ''
    }
  },
  components: {
    AddArticle
  },
  created () {
    this.F_getCollectionDocsSort('posts', { where: 'contentData.createdAt', order: 'desc' }).then(docs => {
      console.log(docs)
      this.editPosts = docs
    })
  },
  methods: {
    putArticle (articleInfo) {
      this.editTitle = articleInfo.contentData.title
      this.editValue = articleInfo.contentData.value
      this.id = articleInfo.id
      this.createdAt = articleInfo.contentData.createdAt
    }
  }
}
</script>
