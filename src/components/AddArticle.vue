<template>
  <b-row class="pageAddArticle">
    <b-modal id="modal-1" title="下一步?" @ok="task">
      <p class="my-4">如要{{ addOrUpdate }}文章請按確認</p>
    </b-modal>

    <b-col cols="3 imgManager-container">
      <div class="imgManager">
        <div>
          <b-button size="sm" variant="outline-primary" @click="$refs.preview__input.click()">上傳檔案</b-button>&nbsp;
          <b-button size="sm" variant="outline-primary" @click="uploadImg">確認上傳</b-button>
        </div>
        <div class="imgManager-upload">
          <ul>
            <li v-for="preview in prewFiles" :key="preview.name" class="preview-select-item">
              {{ preview.name }} {{ uploadStatus }}
            </li>
          </ul>
        </div>
      </div>
    </b-col>

    <b-col cols="9 imgManager-container">
      <div class="imgManager">
        <div class="img-store--list">
          <h3>圖庫清單</h3>
          <div class="picture-wrap">
            <div class="picture" v-for="url in storeImgURLs" :key="url">
              <img :src="url" alt="" srcset="" @click="loadImg">
            </div>
          </div>
        </div>
      </div>
    </b-col>

    <b-col cols="4 mt-2">
      <div class="imgManager-preview">
        <div class="header">
          <h3>預覽:</h3>
          <b-button size="sm" variant="outline-primary" @click="crop">裁切</b-button>
          <b-button size="sm" variant="outline-primary" @click="saveCropData">確認</b-button>
        </div>
        <div class="preview-wrap mt-2 mb-2">
          <img ref="preview__img" class="preview__img">
        </div>
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
import Cropper from 'cropperjs'
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
      targetRef: 'posts/img/' + this.$route.params.who + '/',
      prewFiles: [],
      uploadedSuccessImg: [],
      uploadStatus: '',
      storeImgURLs: [],
      cropper: null,
      croppedData: null
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
  created () {
    console.log(Cropper)
    this.F_listStorageRef(this.targetRef).then(itemList => {
      for (const item of itemList) {
        this.F_getStorageURL(item.fullPath).then(url => {
          this.storeImgURLs.push(url)
        })
      }
      console.log(this.storeImgURLs)
    })
  },
  methods: {
    loadImg (e) {
      // console.log(e.target.currentSrc)
      this.$refs.preview__img.src = e.target.currentSrc
    },

    crop () {
      const image = this.$refs.preview__img
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop (event) {
          console.log(event.detail.x)
          console.log(event.detail.y)
          console.log(event.detail.width)
          console.log(event.detail.height)
          console.log(event.detail.rotate)
          console.log(event.detail.scaleX)
          console.log(event.detail.scaleY)
        }
      })
      this.cropper.crop()
    },

    saveCropData () {
      this.cropper.getCroppedCanvas()
    },

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
      await Promise.all(
        this.prewFiles.map(file => {
          const ref = this.targetRef + file.name
          return this.F_uploadFiles_with_watcher(ref, file.file)
        })
      ).then(res => {
        console.log('url: ', res)
      }).catch(e => {
        console.log(e)
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

      .picture-wrap {
        display: flex;
        flex-wrap: wrap;
        .picture {
          width: 100px;
          height: 80px;
          margin-top: 1rem;
          border: solid 1px #ccc;
          img {
            height: 100%;
            width: 100%;
            object-fit: contain;
            cursor: pointer;
          }
        }
      }

      .imgManager-upload > div:first-child {
        margin-left: 0;
      }

      .imgManager-upload {
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
    .preview-wrap {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }

  .preview__img {
    border: solid 1px #ccc;
  }

  .markdown-body {
    border: #aaa 2px solid;
    border-radius: 5px;
    height: 100%;
    padding: 1rem;
  }

  .header {
    display: flex;
  }
}

</style>
