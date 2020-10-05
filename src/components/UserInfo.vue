<template>
  <div class="container">
    <b-card-group deck>
      <b-card header="帳號資訊" header-tag="header" class="m-3">
        <div role="group" class="m-3">
          <b-form-group>
            <b-form-row class="upload">
              <b-col cols="12" md="2 mt-2">
                <div class="upload-file">
                  <input @change="uploadChange" ref="inputFile" type="file" id="avatar" accept=".jpg,.jpeg,.png">
                  <b-button variant="info">
                    <label for="avatar" ref="fileText">選擇你的頭貼檔案</label>
                  </b-button>
                </div>
              </b-col>
              <b-col cols="12" md="8 mt-2">
                <div class="upload__connect-line"></div>
              </b-col>
              <b-col cols="12" md="2 mt-2">
                <div class="upload-picture">
                  <b-img ref="img" :src="url"></b-img>
                  <span v-if="!url">空空如也</span>
                </div>
              </b-col>
            </b-form-row>
          </b-form-group>

          <label for="account">信箱 (帳號):</label>
          <b-form-input
            id = "account"
            v-model="account"
            disabled
            trim
          ></b-form-input>
          <b-form-text id="input-live-help" v-if="!emailVerified">
            <span>您的帳號尚未認證，點擊</span>
            <span class="mail--verified"
              v-b-tooltip.hover title="發送認證信"
              @click="makeToast('success')"
            >
              連接
            </span>發送認證信
          </b-form-text>
          <b-form-text id="input-live-help" v-if="emailVerified">
            <span style="color: green;">已認證的帳號 !</span>
          </b-form-text>

          <label for="password">密碼:</label>
          <b-form-input
            id = "password"
            v-model="password"
            trim
          ></b-form-input>

          <label for="backupEmail">信箱 (備援):</label>
          <b-form-input
            id = "backupEmail"
            v-model="backupEmail"
            trim
          ></b-form-input>
        </div>
      </b-card>
    </b-card-group>

    <b-card-group deck>
      <b-card header="名稱相關" header-tag="header" class="m-3">
        <div role="group" class="m-3">
          <label for="">暱稱:</label>
          <b-form-input
            id="displayName"
            v-model="displayName"
            trim
          ></b-form-input>
        </div>
        <div role="group" class="m-3">
          <label for="name">英文暱稱:</label>
          <b-form-input
            id = "name"
            v-model="name"
            trim
          ></b-form-input>
        </div>
      </b-card>
    </b-card-group>

    <b-card-group deck>
      <b-card header="聯絡資訊" header-tag="header" class="m-3">
        <div role="group" class="m-3">
          <label for="phoneNumber">電話號碼:</label>
          <b-form-input
            id="phoneNumber"
            v-model="phoneNumber"
            trim
          ></b-form-input>
        </div>
        <div role="group" class="m-3">
          <label for="address">住址:</label>
          <b-form-input
            id = "address"
            v-model="address"
            trim
          ></b-form-input>
        </div>
      </b-card>
    </b-card-group>

    <b-card-group deck>
      <b-card header="簡介" header-tag="header" class="m-3">
        <div role="group" class="m-3">
          <label for="skills">專長:</label>
          <b-form-textarea
            id="skills"
            v-model="skills"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
        <div role="group" class="m-3">
          <label for="intro">自我介紹:</label>
          <b-form-textarea
            id="intro"
            v-model="intro"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
      </b-card>
    </b-card-group>
    <b-button @click.native="updateUserInfo" href="#" variant="primary" class="m-3">更新資料</b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserInfoEditor',
  data () {
    return {
      account: '',
      password: '',
      backupEmail: '',

      displayName: '',
      name: '',

      phoneNumber: '',
      address: '',

      skills: '',
      intro: '',

      photoURL: '',
      uid: '',
      emailVerified: '',

      file: '',
      fileName: '',
      uploaded: false,
      targetRef: ''
    }
  },

  computed: mapState({
    url: state => state.photoURL,
    display: state => state.displayName
  }),

  created () {
    this.F_getManagerInfo(this.$route.params.who).then(manager => {
      if (manager.emailVerified === false) this.refreshVerified()
      else this.appendCurrentValue(manager)
    })
  },

  methods: {
    updateUserInfo () {
      const info = this.appendCurrentValue({}, 'skip get cloud')
      const self = this
      try {
        (async function () {
          await self.F_uploadImg(self.file, self.targetRef)
          await self.F_listStorageRef('managers/' + self.name).then(item => {
            self.F_getStorageURL('managers/' + self.name + '/' + item[0].name).then(url => {
              self.photoURL = url
              console.log(url)
              info.photoURL = url
              self.$store.commit('setCurrentUser', {
                photoURL: self.photoURL
              })
              self.F_updateProfile({ displayName: info.displayName, photoURL: self.photoURL })
              self.F_updateManagerInfo(self.$route.params.who, info)
            })
          })
        })()
      } catch (e) {
        console.log(e)
      }
    },

    makeToast (variant = null) {
      this.F_sendEmailVerified()
      this.$bvToast.toast('我們已發送認證郵件至 ' + this.account + '，請點選信箱連結認證後，再重新整理確認本頁狀態。', {
        title: '提示訊息',
        variant: variant,
        solid: true
      })
    },

    appendCurrentValue (manager, order) {
      if (order === 'skip get cloud') {
        // 返回更新值
        return {
          displayName: this.displayName,
          name: this.name,
          backupEmail: this.backupEmail,
          phoneNumber: this.phoneNumber,
          address: this.address,
          // uid: this.uid,
          skills: this.skills,
          intro: this.intro,
          photoURL: this.photoURL
        }
      }

      // 取得雲端值
      this.account = manager.account
      this.password = manager.password
      this.backupEmail = manager.backupEmail

      this.displayName = manager.displayName
      this.name = manager.name

      this.phoneNumber = manager.phoneNumber
      this.address = manager.address

      this.skills = manager.skills
      this.intro = manager.intro
      this.emailVerified = manager.emailVerified
      // this.uid = manager.uid
      this.photoURL = manager.photoURL
    },

    refreshVerified () {
      (async () => {
        let currentUser = null
        await this.F_showUser().then(user => {
          console.log(user)
          currentUser = user
        })
        await this.F_updateManagerInfo(this.$route.params.who, { emailVerified: currentUser.emailVerified })
        this.F_getManagerInfo(this.$route.params.who).then(manager => {
          console.log(manager)
          this.appendCurrentValue(manager)
        })
      })()
    },

    uploadChange () {
      this.uploaded = false
      this.$refs.fileText.innerText = '請選擇你的頭貼檔案'
      try {
        this.file = this.$refs.inputFile.files[0]
        this.fileName = this.$refs.inputFile.files[0].name
        this.targetRef = 'managers/' + this.name + '/' + this.$refs.inputFile.files[0].name
        this.$refs.img.src = URL.createObjectURL(this.file)
        if (this.$refs.inputFile.files.length !== 0) {
          this.uploaded = !this.uploaded
          this.$refs.fileText.innerText = this.file.name
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
%vertical-center {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.mail--verified {
  color: #33f;
  cursor: pointer;
}

.upload {
  .upload-file {
    @extend %vertical-center;
    width: 100%;
    & > button {
      border-radius: 5px;
      width: 100%;
      & > label {
        width: 100%;
        height: 100%;
        margin: 0;
      }
    }
    input {
      display: none;
    }
  }
  .upload__connect-line{
    width: 80%;
    height: 0px;
    border-top: 1px dashed black;
    margin: 0 auto;
    @extend %vertical-center;
  }
  .upload-picture {
    width: 100%;
    height: 100%;
    border: solid 2px #ccc;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0;
    position: relative;

    & > span {
      position: absolute;
      white-space: nowrap;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
