<template>
  <b-row>
    <b-col cols="2">
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
    <b-col cols="10">
      <AddArticle
        :editTitle="editTitle"
        :editValue="editValue"
        :id="id"
        :createdAt="createdAt"
        action="editArticle"
        @update="updateArticle"
        @updateData="updateData"
      ></AddArticle>
    </b-col>
  </b-row>
</template>

<script>
import AddArticle from './AddArticle.vue'
import firebase from '@/Model/FirebaseModel.vue'
import { dbAPI } from '../../../api/db'
export default {
  name: 'ArticleEditor',
  mixins: [firebase],
  data () {
    return {
      editPosts: [],
      editTitle: '',
      editValue: '',
      createdAt: null,
      id: '',
      updatedData: null
    }
  },
  components: {
    AddArticle
  },
  created () {
    this.F_getCollectionDocsSort('posts', { where: 'contentData.createdAt', order: 'desc' }).then(docs => {
      this.editPosts = docs
    })
  },
  methods: {
    updateData (data) {
      this.updatedData = data
    },
    async updateArticle () {
      try {
        await dbAPI.updateArticle(this.id, this.updatedData)
        this.$bvToast.toast('文章修改成功', {
          title: '成功',
          variant: 'success',
          solid: true
        })
      } catch (err) {
        alert(err)
      }
    },
    putArticle (articleInfo) {
      this.editTitle = articleInfo.contentData.title
      this.editValue = articleInfo.contentData.value
      this.id = articleInfo.id
      this.createdAt = articleInfo.contentData.createdAt
    }
  }
}
</script>
