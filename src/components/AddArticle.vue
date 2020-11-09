<template>
  <b-row class="pageAddArticle">
    <b-modal id="modal-1" title="下一步?" @ok="task">
      <p class="my-4">如要{{ addOrUpdate }}文章請按確認</p>
    </b-modal>

    <b-modal ref="modalUploadInfo" title="上傳本地電腦圖檔" @ok="uploadImg">
      <div v-for="img in storeLocalImgURLs" :key="img.URL">
        <img :src="img.URL" alt="">
        <span>{{ img.name }}</span>
      </div>
      <div v-if="$store.state.uploadProgress !== ''">
        上傳進度: <br />
        {{ $store.state.uploadProgress }}
      </div>
    </b-modal>

    <b-modal size="xl" ref="modalCropper" scrollable title="Scrollable Content">
      <div class="preview_wrap full-width d-flex">
        <div class="half-width">
          <img ref="preview__img" class="preview__img">
        </div>
        <div class="half-width">
          <div id="cropperPreview"></div>
        </div>
      </div>
      <b-button size="md" variant="outline-primary" @click="crop">進行裁切</b-button>
      <b-button size="md" variant="outline-primary" @click="cancelCrop">取消</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox('16/9')">16:9</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox('4/3')">4:3</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox('2/3')">2:3</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox('1/1')">1:1</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox('free')">任意範圍</b-button>
      <b-button size="md" variant="outline-primary" @click="resetCropper">重置</b-button>
      <b-button size="md" variant="warning" @click="uploadAndShowURL">產生網址</b-button>
      <b-form-input size="lg" placeholder="請輸入剪裁後檔案名稱" v-model="croppedName"></b-form-input>
    </b-modal>

    <b-modal ref="info-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>是否要清空所有圖片?</h3>
      </div>
      <b-button class="mt-2" variant="outline-primary" block @click="hideModal('info-modal')">還是先取消好了ㄏㄏ</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="deleteAllCloudImg">不管了!刪除!</b-button>
    </b-modal>

    <b-modal ref="delete-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>是否刪除 {{ currentFileName }}</h3>
      </div>
      <b-button class="mt-2" variant="outline-primary" block @click="hideModal('delete-modal')">還是先取消好了ㄏㄏ</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="deleteImg(currentFileName)">不管了!刪除!</b-button>
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
                <div class="cloud_img" v-for="item in storeImgURLs" :key="item.url">
                  <div>
                    <img v-b-modal class="img_item" :src="item.url" alt="" srcset="" @click="chooseTools(item)">
                  </div>
                  <div>
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
          <template v-slot:footer>
            <b-button size="sm" variant="outline-primary" @click="uploadLocalImgs">上傳電腦圖檔</b-button>
            <b-button size="sm" variant="outline-primary" @click="clearFile">取消上傳</b-button>
            <b-button size="sm" variant="outline-primary" @click="uploadImg">確認上傳</b-button>
            <b-button :class="{ active : wantToCrop }" size="sm" variant="outline-primary" @click="switchTools('cropper')">我要裁切</b-button>
            <b-button :class="{ active : wantTogetURL }" size="sm" variant="outline-primary" @click="switchTools('getURL')">我要取得網址</b-button>
            <b-button :class="{ active : wantToPreview }" size="sm" variant="outline-primary" @click="switchTools('preview')">我要檢視</b-button>
            <b-button size="sm" variant="outline-danger" @click="showModal('info-modal')">清空圖庫</b-button>
            <b-button :class="{ active : wantToDelete }"  size="sm" variant="outline-danger" @click="switchTools('delete')">選擇刪除</b-button>
          </template>
        </b-card>
      </div>
    </b-col>

    <b-col cols="12 mt-3" v-if="wantToPreview" style="height: 300px; overflow: auto;">
      <img :src="wantToPreviewImgURL" alt="">
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
      uploadStatus: '',
      storeImgURLs: [],
      storeLocalImgURLs: [],
      cropper: null,
      croppedData: null,
      croppedName: '',
      wantToCrop: false,
      wantTogetURL: false,
      wantToPreview: false,
      wantToDelete: false,
      wantToPreviewImgURL: '',
      currentFileName: ''
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
    this.listedImg()
  },
  methods: {
    listedImg () {
      this.F_listStorageRef(this.targetRef).then(itemList => {
        for (const item of itemList) {
          this.F_getStorageURL(item.fullPath).then(url => {
            this.storeImgURLs.push({
              name: item.name,
              url: url
            })
          })
        }
      })
    },

    uploadAndShowURL () {
      // getCroppedCanvas 會轉為 canvas， toBlob 為 canvas 原生 WEB API
      this.cropper.getCroppedCanvas({
        minWidth: 540,
        minHeight: 360
      }).toBlob(blob => {
        blob.name = this.croppedName
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
          this.storeLocalImgURLs.push(fileBuffer)
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
        this.storeImgURLs = []
        this.listedImg()
      }).catch(e => {
        console.log(e)
      })
    },

    async uploadAsBlob () {
      await Promise.all(
        this.prewFiles.map(file => {
          const ref = this.targetRef + file.name
          return this.F_uploadFiles_with_watcher(ref, file)
        })
      ).then(res => {
        this.storeImgURLs.push({
          name: res[0].name,
          url: res[0].url
        })
      }).catch(e => {
        console.log(e)
      })
    },

    deleteAllCloudImg () {
      this.deleteAllImg().then((res) => {
        this.storeImgURLs = []
      })
    },

    deleteImg (itemName) {
      this.F_deleteImg(itemName)
      this.hideModal('delete-modal')
      this.storeImgURLs = []
      this.listedImg()
    },

    showModal (modalRef) {
      this.$refs[modalRef].show()
    },

    hideModal (modalRef) {
      this.$refs[modalRef].hide()
    },

    switchTools (tools) {
      this.wantToCrop = false
      this.wantTogetURL = false
      this.wantToPreview = false
      this.wantToDelete = false
      if (tools === 'cropper') this.wantToCrop = true
      if (tools === 'getURL') this.wantTogetURL = true
      if (tools === 'preview') this.wantToPreview = true
      if (tools === 'delete') this.wantToDelete = true
    },

    chooseTools (item) {
      if (this.wantToCrop) {
        this.loadImg(item.url)
      }

      if (this.wantTogetURL) {
        this.makeToast('success', item)
      }

      if (this.wantToPreview) {
        this.wantToPreviewImgURL = item.url
      }

      if (this.wantToDelete) {
        this.currentFileName = item.name
        this.showModal('delete-modal')
      }
    },

    makeToast (variant = null, data) {
      this.$bvToast.toast(data.url, {
        title: '檔案名稱: ' + data.name,
        variant: variant,
        solid: true
      })
    },

    uploadLocalImgs () {
      this.showModal('modalUploadInfo')
      this.$refs.preview__input.click()
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
