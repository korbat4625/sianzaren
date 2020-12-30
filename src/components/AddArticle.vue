<template>
  <b-row class="pageAddArticle">
    <b-modal id="modal-1" title="下一步?">
      <p class="my-4">如要{{ addOrUpdate }}文章請按確認</p>
    </b-modal>

    <b-modal size="lg" ref="modalUploadInfo" title="上傳本地電腦圖檔"
      @hide="clear">
      <b-row>
        <b-col cols="12">
          <div class="responsiveImg mx-auto">
            <img ref="toBeUploadImg">
          </div>
          <span :style="{ display: invalid }" style="color: red;">圖片過大，請先進行裁切</span>
          <span>{{ localImgPreview.name }}</span>
          <b-form-input size="lg" placeholder="請輸入剪裁後檔案名稱" v-model="croppedName"></b-form-input>
        </b-col>
      </b-row>
      <div v-if="$store.state.uploadProgress !== ''">
        上傳進度: <br />
        {{ $store.state.uploadProgress }}
      </div>
      <template #modal-footer>
        <b-button size="sm" variant="outline-primary" @click="$refs.preview__input.click()">
          選擇檔案
        </b-button>
        <b-button size="sm" variant="secondary" @click="hideModal('modalUploadInfo')">
          取消上傳
        </b-button>
        <b-button size="sm" variant="success" @click="task('uploadSingleImg')">
          上傳
        </b-button>
      </template>
    </b-modal>

    <b-modal @hide="cancelCrop()" size="lg" ref="modalCropper" scrollable title="Scrollable Content">
      <b-row>
        <b-col cols="12">
          <div class="responsiveImg mx-auto">
            <img ref="preview__img" class="preview__img">
          </div>
        </b-col>
        <b-col cols="12 mt-2">
          <div class="responsivePreviewImg mx-auto">
            <div class="mx-auto" id="cropperPreview"></div>
          </div>
        </b-col>
      </b-row>
      <b-button size="md" variant="outline-primary" @click="crop($refs.preview__img)">進行裁切</b-button>
      <b-button size="md" variant="outline-primary" @click="cancelCrop">取消</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox(16/9)">16:9</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox(4/3)">4:3</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox(2/3)">2:3</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox(1/1)">1:1</b-button>
      <b-button size="md" variant="outline-primary" @click="changeViewBox('free')">任意範圍</b-button>
      <b-button size="md" variant="outline-primary" @click="resetCropper">重置</b-button>
      <b-button size="md" variant="warning" @click="uploadAndShowURL(false)">產生網址</b-button>
      <b-form-input size="lg" placeholder="請輸入剪裁後檔案名稱" v-model="croppedName"></b-form-input>
    </b-modal>

    <b-modal ref="info-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>真的要清空所有圖片 ?</h3>
      </div>
      <b-button class="mt-2" variant="outline-primary" block @click="hideModal('info-modal')">再想想...</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="deleteAllCloudImg">不管了!刪除!</b-button>
    </b-modal>

    <b-modal ref="delete-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>是否刪除 {{ currentFileName }}</h3>
      </div>
      <b-button class="mt-2" variant="outline-primary" block @click="hideModal('delete-modal')">再想想...</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="deleteImg(currentFileName)">不管了!刪除!</b-button>
    </b-modal>

    <b-col cols="12">
      <div class="accordion cloud" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info">點擊以顯示或隱藏雲端圖庫 {{ $store.state.name }} </b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="cloud_img_container d-flex flex-wrap">
                <div class="cloud_img" v-for="item in storeImgURLs" :key="item.url">
                  <div>
                    <img v-b-modal class="img_item" :src="item.url" alt="" srcset="" @click="showModal('modal-showPic', item)">
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
          <template v-slot:footer>
            <b-button size="sm" variant="outline-primary" @click="uploadLocalImgs">上傳電腦圖檔</b-button>
            <b-button size="sm" variant="outline-primary" @click="clearFile">取消上傳</b-button>
            <b-button size="sm" variant="outline-danger" @click="showModal('info-modal')">清空圖庫</b-button>
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
    <input
      @input="previewImg"
      type="file"
      ref="preview__input"
      accept=".jpg,.jpeg,.png"
    >

    <b-modal ref="modal-showPic" size="lg" hide-header hide-footer>
      <div class="d-flex flex-column">
        <div style="height: 80%;">
          <img style="max-width: 100%;" class="mx-auto" :src="wantToPreviewImgURL" alt="">
        </div>
        <div style="height: 20%;">
          <b-button  size="sm" variant="outline-primary" @click="useTool(cloudData, 'getURL')">我要取得網址</b-button>
          <b-button size="sm" variant="outline-primary" @click="useTool(cloudData, 'cropper')">我要裁切</b-button>
          <b-button size="sm" variant="outline-danger" @click="useTool(cloudData, 'delete')">選擇刪除</b-button>
        </div>
      </div>
    </b-modal>
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

      // created 已經設好的固定路徑，對應到現在使用者擁有的圖片
      targetRef: '',
      // created 已經設好的固定路徑，對應到現在使用者擁有的壓縮版本圖片
      targetRefCompression: '',
      // 儲存第一次列出來的所有圖片，後續添加進去的都應使用 push 方法
      storeImgURLs: [],

      previewCroppedFile: [],
      previewCompressionFile: null,

      uploadStatus: '',
      localImgPreview: {
        name: ''
      },
      cropper: null,
      croppedData: null,
      croppedName: '',
      wantToPreviewImgURL: '',
      currentFileName: '',
      invalid: 'none',
      cloudData: null
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
    const interval = setInterval(() => {
      if (!this.$store.state.name) return
      clearInterval(interval)
      this.targetRef = 'managers/' + this.$store.state.name + '/img'
      this.targetRefCompression = 'managers/' + this.$store.state.name + '/img/compression'
      this.listedImg()
    }, 0)
  },
  methods: {
    async task (task) {
      if (task === 'uploadSingleImg') {
        // 進行壓縮後上傳
        const compress = true
        Promise.all([
          this.uploadAndShowURL(compress),
          this.uploadAndShowURL(!compress)
        ]).then(res => {
          this.cancelCrop()
          this.clear()
          this.clearFile()
        })
        return 'compressed'
      }
      await this.uploadImg(this.targetRef)
      return this.F_updateArticle(this.articleData, this.addOrUpdate, this.$attrs)
    },

    compressPicture (pic) {

    },

    listedImg () {
      this.F_listStorageRef(this.targetRef).then(itemList => {
        for (const item of itemList) {
          console.log(item)
          this.F_getStorageURL(item.fullPath).then(url => {
            this.storeImgURLs.push({
              name: item.name,
              url: url
            })
          })
        }
      })
    },

    resetCropper () {
      return this.cropper.reset()
    },

    crop (img, viewBoxSize = 16 / 9) {
      if (this.cropper) this.cancelCrop()
      const image = img
      this.cropper = new Cropper(image, {
        aspectRatio: viewBoxSize,
        preview: '#cropperPreview'
      })
      this.cropper.crop()
    },

    changeViewBox (viewboxSize) {
      if (this.$refs.preview__img.src === '') return 'none'
      if (this.$refs.preview__img.src === '') return 'none'
      console.log('pass')
      // if (this.cropper === null) {
      //   this.crop(this.$refs.preview__img, viewboxSize)
      // } else {
      //   if (this.cropper.ready === false) {
      //     this.crop(this.$refs.preview__img, viewboxSize)
      //   }
      // }
      this.crop(this.$refs.preview__img, viewboxSize)
      return 'done'
    },

    loadImg (imgUrl) {
      this.$refs.modalCropper.show()
      setTimeout(() => {
        this.$refs.preview__img.src = imgUrl
        this.crop(this.$refs.preview__img)
      }, 0)
      return 'done'
    },

    cancelCrop () {
      if (!this.cropper) return 'done'
      this.cropper.clear()
      this.cropper.destroy()
      this.cropper = null
      return 'done'
    },

    clear (obj) {
      this.croppedName = ''
      this.localImgPreview.name = ''
      this.$refs.preview__input.value = ''
    },

    clearFile () {
      this.previewCroppedFile = []
      this.$store.commit('clearProgress')
      return 'done'
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

    previewImg () {
      try {
        if (this.cropper !== null) this.cancelCrop()
        const file = this.$refs.preview__input.files[0]
        const img = new Image()
        this.localImgPreview.name = file.name
        this.$refs.toBeUploadImg.src = URL.createObjectURL(file)
        img.src = URL.createObjectURL(file)
        img.onload = () => {
          if (img.width > 800 || img.height > 450) {
            this.invalid = 'block'
            this.crop(this.$refs.toBeUploadImg)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },

    async uploadAndShowURL (compress = false) {
      // getCroppedCanvas 會轉為 canvas， toBlob 為 canvas 原生 WEB API
      const typeOfImg = compress ? 'image/jpeg' : 'image/png'
      const rateOfCompress = compress ? 0.9 : 1
      let fileName = this.croppedName ? this.croppedName : this.localImgPreview.name
      fileName = compress ? fileName + '_compressed' : fileName

      this.cropper.getCroppedCanvas({
        minWidth: 640,
        minHeight: 360
      }).toBlob(async blob => {
        blob.name = this.croppedName
        this.previewCroppedFile = []
        this.previewCroppedFile[0] = blob
        const ref = compress ? this.targetRefCompression + '/' + fileName + '/' : this.targetRef + '/' + fileName + '/'
        return this.uploadAsBlob(ref)
      }, typeOfImg, rateOfCompress)
    },

    async uploadImg (ref) {
      await Promise.all(
        this.previewCroppedFile.map(file => {
          return this.F_uploadFiles_with_watcher(ref, file.file)
        })
      ).then(res => {
        this.storeImgURLs = []
        this.listedImg()
      }).catch(e => {
        console.log(e)
      })
    },

    async uploadAsBlob (ref) {
      return await Promise.all(
        this.previewCroppedFile.map(file => {
          const targetRef = ref + file.name
          return this.F_uploadFiles_with_watcher(targetRef, file)
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

    showModal (modalRef, item) {
      this.$refs[modalRef].show()
      this.cloudData = item
      if (modalRef === 'modal-showPic') {
        this.useTool(this.cloudData, 'preview')
      }
    },

    hideModal (modalRef) {
      this.$refs[modalRef].hide()
    },

    useTool (item, tool) {
      console.log(item, tool)
      switch (tool) {
        case 'cropper': this.loadImg(item.url); break
        case 'getURL': {
          console.log('geturl')
          this.makeToast('success', item); break
        }
        case 'preview': this.wantToPreviewImgURL = item.url; break
        case 'delete': {
          this.currentFileName = item.name
          this.showModal('delete-modal')
          break
        }
        default: break
      }
    },

    makeToast (variant = null, data) {
      console.log(data)
      this.$bvToast.toast(data.url, {
        title: '檔案名稱: ' + data.name,
        variant: variant,
        solid: true
      })
    },

    uploadLocalImgs () {
      if (this.cropper !== null) this.cancelCrop()
      this.showModal('modalUploadInfo')
      this.$refs.preview__input.click()
      this.invalid = 'none'
    }
  }
}
</script>

<style lang="scss" scope>
</style>
