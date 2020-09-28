<template>
  <b-container fluid>
    <b-row>
      <b-col cols="8" offset="2">
        <div class="article">
          <div class="content__header">
            <h3>{{ articleInfo.title }}</h3>
            <p>文章作者: {{ articleInfo.authorInfo.displayName }}</p>
            <p>上傳時間: {{ articleInfo.createdAt }}</p>
          </div>
          <div class="article__content" v-html="articleInfo.html"></div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db } from '../Model/FirebaseModel.js'
export default {
  name: 'ArticlePage',
  data () {
    return {
      articleId: this.$route.params.articleId,
      articleInfo: {
        title: '',
        createdAt: '',
        authorInfo: {
          displayName: '',
          email: '',
          uid: '',
          photoURL: ''
        }
      }
    }
  },
  created () {
    const articleRef = db.collection('posts').doc(this.articleId)
    articleRef.get().then((doc) => {
      if (doc.exists) {
        this.articleInfo = doc.data()
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }).catch(function (error) {
      console.log('Error getting document:', error)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
