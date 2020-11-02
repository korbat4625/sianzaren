<template>
  <b-row class="pageAddArticle">
    <b-modal id="modal-1" title="下一步?" @ok="task">
      <p class="my-4">如要{{ addOrUpdate }}文章請按確認</p>
    </b-modal>

    <b-modal size="xl" ref="modalCropper" scrollable title="Scrollable Content">
      <b-card-group deck>
        <b-card
          header="裁切處"
          header-tag="header"
          footer-tag="footer"
        >
          <div class="preview_wrap full-width d-flex">
            <div class="half-width">
              <img ref="preview__img" class="preview__img">
            </div>
            <div class="half-width">
              <div id="cropperPreview"></div>
            </div>
          </div>
          <template v-slot:footer>
            <b-button size="md" variant="outline-primary" @click="crop">進行裁切</b-button>&nbsp;
            <b-button size="md" variant="outline-primary" @click="cancelCrop">取消</b-button>&nbsp;
            <b-button size="md" variant="outline-primary" @click="changeViewBox('16/9')">16:9</b-button>
            <b-button size="md" variant="outline-primary" @click="changeViewBox('4/3')">4:3</b-button>
            <b-button size="md" variant="outline-primary" @click="changeViewBox('2/3')">2:3</b-button>
            <b-button size="md" variant="outline-primary" @click="changeViewBox('1/1')">1:1</b-button>
            <b-button size="md" variant="outline-primary" @click="changeViewBox('free')">任意範圍</b-button>
            <b-button size="md" variant="outline-primary" @click="resetCropper">重置</b-button>
            <b-button size="md" variant="warning" @click="uploadAndShowURL">產生網址</b-button>
          </template>
        </b-card>
      </b-card-group>
    </b-modal>

    <b-modal ref="info-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>是否要清空所有圖片?</h3>
      </div>
      <b-button class="mt-2" variant="outline-primary" block @click="hideModal">還是先取消好了ㄏㄏ</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="deleteAllCloudImg">不管了!刪除!</b-button>
    </b-modal>

    <b-col cols="12">
      <div class="accordion cloud" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info">點擊以顯示或隱藏雲端圖庫</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="cloud_img_container d-flex flex-wrap">
                <div class="cloud_img" v-for="url in storeImgURLs" :key="url">
                  <img v-b-modal class="img_item" :src="url" alt="" srcset="" @click="loadImg(url)">
                </div>
              </div>
            </b-card-body>
          </b-collapse>
          <template v-slot:footer>
            <b-button size="sm" variant="outline-primary" @click="$refs.preview__input.click()">選擇檔案</b-button>
            <b-button size="sm" variant="outline-primary" @click="clearFile">取消上傳</b-button>
            <b-button size="sm" variant="outline-primary" @click="uploadImg">確認上傳</b-button>
            <b-button size="sm" variant="outline-danger" @click="showModal">清空圖庫</b-button>
          </template>
        </b-card>
      </div>
    </b-col>

    <b-col cols="12 mt-3">
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

    <input @change="previewImg"
      type="file"
      id="preview__input"
      ref="preview__input"
      accept=".jpg,.jpeg,.png"
      multiple
    >
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
    uploadAndShowURL () {
      // getCroppedCanvas 會轉為 canvas， toBlob 為 canvas 原生 WEB API
      this.cropper.getCroppedCanvas({
        minWidth: 540,
        minHeight: 360
      }).toBlob(blob => {
        this.prewFiles = []
        this.prewFiles[0] = blob
        this.uploadAsBlob()
      })
    },

    resetCropper () {
      return this.cropper.reset()
    },

    changeViewBox (viewboxSize) {
      if (this.$refs.preview__img.src === '') return 'none'
      if (this.$refs.preview__img.src === '') return 'none'
      viewboxSize = viewboxSize.split('/')
      const ratio = viewboxSize[0] / viewboxSize[1]
      if (this.cropper === null) {
        this.crop(ratio)
      } else {
        if (this.cropper.ready === false) {
          this.crop(ratio)
        }
        this.cropper.setAspectRatio(ratio)
      }

      return 'done'
    },

    loadImg (imgUrl) {
      // console.log(e.target.currentSrc)
      console.log(this.$refs)
      this.$refs.modalCropper.show()
      setTimeout(() => {
        this.$refs.preview__img.src = imgUrl
        this.crop()
      }, 0)
      return 'done'
    },

    cancelCrop () {
      this.cropper.clear()
      this.cropper.destroy()
      this.cropper = null
      return 'done'
    },

    clearFile () {
      this.prewFiles = []
      this.$store.commit('clearProgress')
      return 'done'
    },

    crop (viewBoxSize = 16 / 9) {
      if (this.cropper !== null) return 'none'
      if (this.$refs.preview__img.src === '') return 'none'
      const image = this.$refs.preview__img
      this.cropper = new Cropper(image, {
        aspectRatio: viewBoxSize,
        preview: '#cropperPreview'
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
        this.storeImgURLs = this.storeImgURLs.concat(res)
      }).catch(e => {
        console.log(e)
      })
    },

    async uploadAsBlob () {
      await Promise.all(
        this.prewFiles.map(file => {
          const ref = this.targetRef
          return this.F_uploadFiles_with_watcher(ref, file)
        })
      ).then(res => {
        this.storeImgURLs = this.storeImgURLs.concat(res)
      }).catch(e => {
        console.log(e)
      })
    },

    deleteAllCloudImg () {
      this.deleteAllImg().then((res) => {
        console.log(res)
        this.storeImgURLs = []
      })
    },

    showModal () {
      this.$refs['info-modal'].show()
    },

    hideModal () {
      this.$refs['info-modal'].hide()
    }
  }
}
</script>

<style lang="scss" scope>
.pageAddArticle {
  padding: 1rem;
  height: 100%;
  .cloud {
    height: 100%;
    justify-content: center;
    align-items: center;
    .card {
      height: 100%;
      #accordion-1 {
        height: 100%;
      }
    }
  }
  .cloud_img_container {

    .cloud_img {
      width: 100px;
      height: 100px;
      box-shadow: 0 0 0 1px #ccc;
      margin: 5px;

      .img_item {
        object-fit: cover;
        width: 100px;
        height: 100px;
      }
    }
  }
}

.card-deck {
  height: 100%;
}

#cropperPreview {
  width: 100%;
  height: 56.25%;
  overflow: hidden;
  border: solid 2px #ccc;
}

button {
  display: inline-block;
}

.preview_wrap {
  width: 100%;
  height: 270px;
  img {
    height: 270px;
    width: 100%;
    object-fit: cover;
  }
}

.full-width {
  width: 100%;
}

.half-width {
  width: 50%;
}

</style>
