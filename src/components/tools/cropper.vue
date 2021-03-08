<template>
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
    <!-- <b-button size="md" variant="outline-primary" @click="changeViewBox(2/3)">2:3</b-button> -->
    <b-button size="md" variant="outline-primary" @click="changeViewBox(1/1)">1:1</b-button>
    <!-- <b-button size="md" variant="outline-primary" @click="changeViewBox('free')">任意範圍</b-button> -->
    <b-button size="md" variant="outline-primary" @click="resetCropper">重置</b-button>
    <b-button size="md" variant="warning" @click="singleUploadTask(false)">產生網址</b-button>
    <b-form-input size="lg" placeholder="請輸入剪裁後檔案名稱" v-model="croppedName"></b-form-input>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    async task (task) {
      // 進行壓縮後上傳
      const compress = true
      Promise.all([
        this.singleUploadTask(compress),
        this.singleUploadTask(!compress)
      ]).then(res => {
        this.cancelCrop()
        this.clear()
        this.clearFile()
      })
      return 'compressed'
    },
    async singleUploadTask (compress = false) {
      // getCroppedCanvas 會轉為 canvas， toBlob 為 canvas 原生 WEB API
      const typeOfImg = compress ? 'image/jpeg' : 'image/png'
      const rateOfCompress = compress ? 0.9 : 1
      let fileName = this.croppedName ? this.croppedName : this.localInputPreview.name
      fileName = compress ? fileName + '_compressed' : fileName

      this.cropper.getCroppedCanvas({
        minWidth: 640,
        minHeight: 360
      }).toBlob(async blob => {
        blob.name = this.croppedName
        this.previewCroppedFile = []
        this.previewCroppedFile[0] = blob
        const ref = compress ? this.targetRefCompression + '/' + fileName + '/' : this.targetRef + '/' + fileName + '/'
        return this.uploadImg(ref)
      }, typeOfImg, rateOfCompress)
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
      // if (this.cropper === null) {
      //   this.crop(this.$refs.preview__img, viewboxSize)
      // } else {
      //   if (this.cropper.ready === false) {
      //     this.crop(this.$refs.preview__img, viewboxSize)
      //   }
      // }
      this.crop(this.$refs.preview__img, viewboxSize)
      return 'done'
    }
  }
}
</script>

<style>

</style>
