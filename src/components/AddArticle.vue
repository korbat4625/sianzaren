<template>
  <b-row>
    <b-modal id="modal-1" title="下一步?" @ok="F_updateArticle(articleData, addOrupdate , $attrs)">
      <p class="my-4">如要{{ addOrupdate }}文章請按確認</p>
    </b-modal>
    <b-col cols="12">
      <label for="input-large">文章標題:</label>
      <b-form-input id="input-large" size="lg" placeholder="請輸入文章標題" v-model="title"></b-form-input>
    </b-col>
    <b-col cols="12">
      <MarkdownPro
        @on-save="updateData"
        v-model="value"
      ></MarkdownPro>
    </b-col>
    <b-col class="mt-2"><b-button v-b-modal.modal-1 variant="primary">點擊{{ addOrupdate }}文章</b-button></b-col>
  </b-row>
</template>

<script>
import { MarkdownPro } from 'vue-meditor'
export default {
  name: 'AddArticle',
  data () {
    return {
      articleData: {},
      title: '',
      value: '',
      addOrupdate: '新增'
    }
  },
  watch: {
    $attrs: function (newVal, oldVal) {
      this.addOrupdate = '更新'
      this.title = newVal.editTitle
      this.value = newVal.editValue
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
.pageAddArticle {
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
