<template>
  <div class="container">
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
        </div>

        <div role="group" class="m-3">
          <label for="password">密碼:</label>
          <b-form-input
            id = "password"
            v-model="password"
            trim
          ></b-form-input>
        </div>

        <div role="group" class="m-3">
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
      emailVerified: ''
    }
  },

  created () {
    this.F_getManagerInfo(this.$route.params.who).then(manager => {
      if (manager.emailVerified === false) this.refreshVerified()
      else this.appendCurrentValue(manager)
    })
  },

  methods: {
    updateUserInfo () {
      const info = this.appendCurrentValue({}, 'skip get cloud')
      this.F_updateProfile(info)
      this.F_updateManagerInfo(this.$route.params.who, info)
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
          intro: this.intro
          // photoURL: this.photoURL
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
      // this.photoURL = manager.photoURL
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
    }
  }
}
</script>

<style lang="scss" scoped>
.mail--verified {
  color: #33f;
  cursor: pointer;

}
</style>
