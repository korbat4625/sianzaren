<template>
  <b-container class="pageArticleEditor">
    <b-row>
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
export default {
  name: 'ArticleEditor',
  data () {
    return {
    }
  },
  components: {
    MarkdownPro
  },
  methods: {
    updateArticle (content) {
      console.log(content)
    }
  }
}
</script>

<style language="scss" scope>
.pageArticleEditor {
  padding: 1rem;
}
.markdown-body {
  border: #aaa 2px solid;
  border-radius: 5px;
  height: 100%;
  padding: 1rem;
}
</style>
