<template>
  <b-row class="pageAddArticle">
    <b-modal id="modal-1" title="下一步?" @ok="task">
      <p class="my-4">如要{{ addOrUpdate }}文章請按確認</p>
    </b-modal>

    <b-col cols="4 imgManager-container">
      <div class="imgManager">
        <div class="img-store--list">
          <h3 id="picture-list">圖庫清單</h3>
          <b-button size="sm" variant="outline-primary" @click="$refs.preview__input.click()">上傳檔案</b-button>

          <ul class="">
            <li v-for="img in uploadedSuccessImg" :key="img.key"></li>
          </ul>
        </div>
        <div class="imgManager-upload">
          <ul>
            <li v-for="preview in prewFiles" :key="preview.name" class="preview-select-item">
              {{ preview.name }}
            </li>
          </ul>
        </div>
      </div>
    </b-col>

    <b-col cols="8">
      <div class="imgManager-preview">
        <h4>預覽:</h4>
        <img ref="preview__img" class="preview__img">
        <input @change="previewImg"
          type="file"
          id="preview__input"
          ref="preview__input"
          accept=".jpg,.jpeg,.png"
          multiple
        >
      </div>
    </b-col>

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

      prewFiles: [],
      uploadedSuccessImg: []
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

    async task () {
      await this.uploadImg()
      return this.F_updateArticle(this.articleData, this.addOrUpdate, this.$attrs)
    },

    previewImg () {
      try {
        for (const currentFile of this.$refs.preview__input.files) {
          console.log(currentFile)
          const fileBuffer = {
            file: currentFile,
            name: currentFile.name,
            URL: URL.createObjectURL(currentFile)
          }
          this.prewFiles.push(fileBuffer)
        }
      } catch (e) {
        console.log(e)
      }
    },

    async uploadImg () {
      let item = null
      this.targetRef = 'posts/img/' + this.$route.params.who + '/'
      for (let i = 0; i < this.prewFiles.length; i++) {
        setTimeout(() => {
          console.log('上船路徑:', 'posts/img/' + this.$route.params.who + '/' + this.prewFiles[i].name)
          console.log('上船檔案:', this.prewFiles[i].file)
          const ref = this.targetRef + this.prewFiles[i].name
          this.F_uploadFiles_with_watcher(ref, this.prewFiles[i].file)
        }, 0)
      }
      await this.F_listStorageRef(this.targetRef).then(listedItem => {
        item = listedItem
      })
      console.log('item::', item)
      return this.F_getStorageURL(this.targetRef + '/' + item[0].name).then(url => {
        this.articleImgURL = url
        console.log('調查影像: ', url)
      })
    }
  }
}
</script>

<style lang="scss" scope>
.pageAddArticle {
  padding: 1rem;
  height: 100%;

  .imgManager-container {
    height: 30%;

    .imgManager {
      border-radius: 5px;
      border: solid 1px #ddd;
      padding: 1rem 1rem 0rem 1rem;
      height: 100%;
      overflow-y: auto;

      .img-store--list {
        position: relative;
        #picture-list {
          position: absolute;
          right: 0;
          top: 0;
          text-shadow: 6px 6px 3px rgba(0,0,0,0.2);
        }
      }

      .imgManager-upload > div:first-child {
        margin-left: 0;
      }

      .imgManager-upload {
        .preview-select-item {

        }
        .upload-icon {
          font-size: 3rem;
          height: 50px;
          width: 50px;
          position: relative;
          margin-left: .25rem;
          svg {
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }

  .imgManager-preview {
    border: solid 1px #ddd;
    height: 100%;
    border-radius: 5px;
    padding: 1rem 1rem 0rem 1rem;
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
