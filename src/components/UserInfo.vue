<template>
  <div class="container">

    <b-button @click="$bvModal.show('modal-scoped')">Open Modal</b-button>
    <b-modal size="lg" id="modal-scoped">
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-button size="sm" variant="outline-danger" @click="close()">
          不儲存關閉
        </b-button>
        <h5>編輯個人資料</h5>
      </template>

      <div class="hero--cover"></div>

      <div class="upload-picture">
        <label for="avatar" class="container-camera-icon">
          <div class="mask">
            <b-icon icon="camera"></b-icon>
          </div>
          <b-img ref="avatarImg" :src="url" class="avatar"></b-img>
        </label>
        <span v-if="!url">空空如也</span>
      </div>

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

      <b-card-group deck>
        <b-card header="帳號資訊" header-tag="header" class="m-3">
          <div role="group" class="m-3">
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

      <template v-slot:modal-footer="{ hide }">
        <b>Custom Footer</b>
        <b-button size="sm" variant="success" @click="updateUserInfo">
          更新資料
        </b-button>
        <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
          不儲存關閉
        </b-button>
      </template>
    </b-modal>

    <input @change="uploadChange" ref="inputFile" type="file" id="avatar" accept=".jpg,.jpeg,.png">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '../Model/FirebaseModel.vue'
export default {
  name: 'UserInfoEditor',
  mixins: [firebase],
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
      try {
        this.file = this.$refs.inputFile.files[0]
        this.fileName = this.$refs.inputFile.files[0].name
        this.targetRef = 'managers/' + this.name + '/' + this.$refs.inputFile.files[0].name
        this.$refs.avatarImg.src = URL.createObjectURL(this.file)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss">
%vertical-center {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.mail--verified {
  color: #33f;
  cursor: pointer;
}

.hero--cover {
  width: 100%;
  height: 200px;
  background-color: #ccc;
  background-image: url('../assets/cover.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.upload-picture {
  display: block;
  border-radius: 50%;
  padding-left: 1rem;
  box-shadow: 0px 0px 0px 3px #fff;
  margin-top: -2.5rem;

  label.container-camera-icon {
    width: 4.5rem;
    height: 4.5rem;
    margin: 0px;
    color: white;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 0px 0px 3px #fff;

    img.avatar {
      width: 72px;
      height: 72px;
      object-fit: cover;
    }

    .mask {
      font-size: 2rem;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  & > span {
    position: absolute;
    white-space: nowrap;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

input[type=file] {
  display: none;
}
</style>
