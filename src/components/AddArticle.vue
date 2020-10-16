<template>
  <b-row class="pageAddArticle">
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
      <div class="preview">
        <label for="preview__input" class="preview__label">為文章上個縮圖</label>
        <input @change="previewImg" type="file" id="preview__input" ref="preview__input" accept=".jpg,.jpeg,.png">
        <img ref="preview__img" class="preview__img">
      </div>
    </b-col>
    <b-col cols="12">
      <div>
        <label for="tags-pills">請輸入文章標籤</label>
        <b-form-tags
          input-id="tags-pills"
          v-model="tags"
          tag-variant="info"
          size="lg"
          separator=" ,;"
          placeholder="可以使用空格、逗號、分號、enter 鍵來輸入標籤"
          remove-on-delete
        ></b-form-tags>
        <p class="mt-2">Value: {{ tags }}</p>
      </div>
    </b-col>
    <b-col class="mt-2"><b-button v-b-modal.modal-1 variant="primary">點擊{{ addOrUpdate }}文章</b-button></b-col>
  </b-row>
</template>

<script>
import { MarkdownPro } from 'vue-meditor'
import firebase from '../Model/FirebaseModel.vue'
export default {
  name: 'AddArticle',
  mixins: [firebase],
  data () {
    return {
      articleData: {},
      title: '',
      value: '',
      addOrUpdate: '新增',
      tags: [],
      createdAt: null,

      file: null,
      fileName: null,
      targetRef: null,
      articleImgURL: ''
    }
  },
  watch: {
    $attrs: function (newVal, oldVal) {
      this.addOrUpdate = '更新'
      this.title = newVal.editTitle
      this.value = newVal.editValue
      this.createdAt = newVal.createdAt
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

      if (this.addOrUpdate !== '更新') this.createdAt = new Date().getTime()

      this.F_showUser().then(res => {
        this.articleData.contentData = {
          title: self.title,
          createdAt: self.createdAt,
          value: saveEventInfo.value,
          stopOnMore: saveEventInfo.stopOnMore,
          html: saveEventInfo.html
        }

        this.articleData.authorInfo = {
          displayName: res.displayName,
          email: res.email,
          uid: res.uid,
          photoURL: res.photoURL
        }

        this.articleData.others = {
          tags: self.tags,
          articleImgURL: self.articleImgURL
        }
      })
    },

    previewImg () {
      try {
        console.log(this.$refs.preview__input.files)
        this.file = this.$refs.preview__input.files[0]
        this.fileName = this.$refs.preview__input.files[0].name
        this.$refs.preview__img.src = URL.createObjectURL(this.file)
        this.articleImgURL = this.$refs.preview__img.src
      } catch (e) {
        console.log(e)
      }
    },

    uploadImg () {
      const self = this
      try {
        (async function () {
          await self.F_uploadImg(self.file, self.targetRef)
          await self.F_listStorageRef('posts/' + self.name).then(item => {
            self.F_getStorageURL('posts/' + self.name + '/' + item[0].name).then(url => {
              self.articleImgURL = url
            })
          })
        })()
      } catch (e) {
        console.log(e)
      }
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

  .markdown-body {
    border: #aaa 2px solid;
    border-radius: 5px;
    height: 100%;
    padding: 1rem;
  }

  .preview {
    width: 100%;
    .preview__img {
      width: 300px;
      border: 1px solid black;
      object-fit: contain;
      object-position: 0 0;
    }
  }
}

</style>
