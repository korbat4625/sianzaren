<template>
  <b-container class="pageArticleEditor">
    <b-modal id="modal-1" title="是否新增文章" @ok="F_updateArticle(articleData)">
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
    updateData (saveEventInfo) {
      const splitter = '<!-- more -->'
      if (saveEventInfo.value.indexOf(splitter) === -1) {
        saveEventInfo.value = saveEventInfo.value.slice(0, 20) + splitter + saveEventInfo.value.slice(20)
      }

      saveEventInfo.stopOnMore = saveEventInfo.value.split(splitter)
      saveEventInfo.stopOnMore = saveEventInfo.stopOnMore[0] + '...'

      this.articleData = saveEventInfo
      this.articleData.title = this.title
      this.articleData.createdAt = new Date().getTime()

      this.F_showUser().then(res => {
        const buffer = {
          displayName: res.displayName,
          email: res.email,
          uid: res.uid,
          photoURL: res.photoURL
        }

        this.articleData.authorInfo = buffer
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
