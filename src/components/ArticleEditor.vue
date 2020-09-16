<template>
  <b-container class="pageArticleEditor">
    <b-modal id="modal-1" title="是否新增文章" @ok="updateArticle(articleData)">
      <p class="my-4">如要新增請按確認</p>
    </b-modal>
    <b-row>
      <b-col cols="12">
        <label for="input-large">文章標題:</label>
        <b-form-input id="input-large" size="lg" placeholder="請輸入文章標題" v-model="title"></b-form-input>
      </b-col>
      <b-col cols="12">
        <MarkdownPro
          @on-save="updateData"
        ></MarkdownPro>
      </b-col>
      <b-col class="mt-2"><b-button v-b-modal.modal-1 variant="primary">點擊新增文章</b-button></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { MarkdownPro } from 'vue-meditor'
import { db } from '../Model/FirebaseModel.js'
console.log(db)
export default {
  name: 'ArticleEditor',
  data () {
    return {
      title: '',
      articleData: {}
    }
  },
  components: {
    MarkdownPro
  },
  methods: {
    updateData (content) {
      this.articleData = content
      this.articleData.title = this.title
      this.articleData.createdAt = new Date().getTime()
      console.log(this.articleData)
      this.articleData.articleInfo = {
        email: 'korbat4625@gmail.com',
        emailVerified: false,
        name: null,
        photoUrl: null,
        uid: 'WeUniFQleyaoZ0bwvibUrku1DRk2'
      }
      this.showUser()
      console.log(this.articleData)
    },

    updateArticle (data) {
      db.collection('managers').doc('korbat4625').collection('posts').add(data).then(res => {
        console.log('新增文章成功')
      }).catch(res => {
        console.log('新增文章失敗')
      })

      db.collection('posts').add(data).then(res => {
        console.log('新增文章成功')
        db.collection('posts').orderBy('createdAt', 'desc')
      }).catch(res => {
        console.log('新增文章失敗')
      })
    }
  }
}
</script>

<style lang="scss" scope>
.pageArticleEditor {
  padding: 1rem;

  & > .row {
    & > div {
      margin: 1rem;;
    }
  }
}

.markdown-body {
  border: #aaa 2px solid;
  border-radius: 5px;
  height: 100%;
  padding: 1rem;
}
</style>
