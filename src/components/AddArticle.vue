<template>
  <b-row>
    <b-modal id="modal-1" title="下一步?" @ok="F_updateArticle(articleData, addOrUpdate , $attrs)">
      <p class="my-4">如要{{ addOrUpdate }}文章請按確認</p>
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
    <b-col cols="12">
      <b-form-group label="請選擇文章分類">
        <b-form-checkbox-group
          id="categories"
          size="lg"
          v-model="tags"
          :options="options"
          name="categories"
        ></b-form-checkbox-group>
      </b-form-group>
    </b-col>
    <b-col class="mt-2"><b-button v-b-modal.modal-1 variant="primary">點擊{{ addOrUpdate }}文章</b-button></b-col>
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
      addOrUpdate: '新增',
      tags: [],
      options: [
        { text: '閒聊雜談', value: 'chat' },
        { text: '心情', value: 'emotion' },
        { text: '遊戲', value: 'game' },
        { text: '技術', value: 'tech' }
      ]
    }
  },
  watch: {
    $attrs: function (newVal, oldVal) {
      this.addOrUpdate = '更新'
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
      const self = this
      if (saveEventInfo.value.indexOf(splitter) === -1) {
        saveEventInfo.value = saveEventInfo.value.slice(0, 20) + splitter + saveEventInfo.value.slice(20)
      }

      saveEventInfo.stopOnMore = saveEventInfo.value.split(splitter)
      saveEventInfo.stopOnMore = saveEventInfo.stopOnMore[0] + '...'

      this.F_showUser().then(res => {
        this.articleData.contentData = {
          title: self.title,
          createdAt: new Date().getTime(),
          value: saveEventInfo.value,
          stopOnMore: saveEventInfo.stopOnMore
        }

        this.articleData.authorInfo = {
          displayName: res.displayName,
          email: res.email,
          uid: res.uid,
          photoURL: res.photoURL
        }

        this.articleData.aboutCategory = {
          tags: self.tags
        }
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
