<template>
  <div class="container">
    <b-card-group header="名稱相關" header-tag="header" deck>
      <b-card title="Title" class="m-3">
        <div role="group" class="m-3">
          <label for="">暱稱:</label>
          <b-form-input
            id="displayName"
            v-model="displayName"
            trim
          ></b-form-input>
        </div>
        <div role="group" class="m-3">
          <label for="name">姓名:</label>
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
          <label for="email">信箱:</label>
          <b-form-input
            id = "email"
            v-model="email"
            trim
          ></b-form-input>
          <b-form-text id="input-live-help" v-if="!emailVerified">
            您的信箱尚未認證，點擊
            <span class="mail--verified"
              v-b-tooltip.hover title="發送認證信"
              @click="makeToast('success')"
            >
              連接
            </span>發送認證信
          </b-form-text>
        </div>
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
      displayName: '',
      name: '',
      email: '',
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
    this.F_showUser().then(user => {
      console.log(user)
    })
  },
  methods: {
    updateUserInfo () {
      const info = {}
      // info.displayName = this.displayName
      // info.email = this.email
      // info.phoneNumber = this.phoneNumber
      // info.address = this.address
      // info.skills = this.skills
      // info.intro = this.intro
      // info.photoURL = this.photoURL
      // info.online = true

      this.F_updateProfile(info).then(function (res) {
        // Update successful.
      }).catch(function (error) {
        // An error happened.
        console.log(error)
      })

      this.F_setManagerData(info).then(function () {
        //
      }).catch(function (error) {
        console.error('Error writing document: ', error)
      })
    },

    makeToast (variant = null) {
      this.$bvToast.toast('我們已發送認證郵件至', {
        title: '提示訊息',
        variant: variant,
        solid: true
      })
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
