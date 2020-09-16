<template>
  <b-container class="pageArticleEditor">
    <b-row>
      <b-col cols="12">
        <label for="input-large">文章標題:</label>
        <b-form-input id="input-large" size="lg" placeholder="請輸入文章標題" v-model="title"></b-form-input>
      </b-col>
      <b-col cols="12">
        <MarkdownPro
          @on-save="updateArticle"
        ></MarkdownPro>
      </b-col>
      <b-col class="mt-2"><b-button variant="primary" @click="updateArticle">點擊新增文章</b-button></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { MarkdownPro } from 'vue-meditor'
import { firebase } from '../Model/FirebaseModel.js'
export default {
  name: 'ArticleEditor',
  data () {
    return {
      title: ''
    }
  },
  components: {
    MarkdownPro
  },
  methods: {
    updateArticle (content) {
      const update = content
      update.title = this.title
      console.log(update)
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
