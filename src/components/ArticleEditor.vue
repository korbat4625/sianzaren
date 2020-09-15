<template>
  <b-container class="pageArticleEditor">
    <b-row>
      <b-col cols="6">
        <b-form-textarea v-model="content" debounce="500" rows="30"></b-form-textarea>
      </b-col>
      <b-col cols="6">
        <markdown-it-vue-light class="md-body" :content="content" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
export default {
  name: 'ArticleEditor',
  data () {
    return {
      content: ''
    }
  },
  components: {
    MarkdownItVueLight
  },
  methods: {}
}
</script>

<style language="scss" scope>
.pageArticleEditor {
  padding: 1rem;
}
.markdown-body {
  border: #ccc 1px solid;
  border-radius: 5px;
  height: 100%;
}
</style>
