<template>
  <div class="container">
    <b-card-group deck>
      <b-card header="編輯個人資料" header-tag="header" footer-tag="footer" title="Title" class="m-3">
        <div role="group" class="m-3">
          <label for="input-live">暱稱:</label>
          <b-form-input
            v-model="displayName"
            trim
          ></b-form-input>
        </div>
        <div role="group" class="m-3">
          <label for="input-live">電子信箱:</label>
          <b-form-input
            v-model="email"
            trim
          ></b-form-input>
        </div>
        <div role="group" class="m-3">
          <label for="input-live">電話號碼:</label>
          <b-form-input
            v-model="phoneNumber"
            trim
          ></b-form-input>
        </div>
        <b-button @click.native="updateUserInfo" href="#" variant="primary" class="m-3">更新資料</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'UserInfoEditor',
  data () {
    return {
      displayName: '',
      email: '',
      phoneNumber: ''
    }
  },
  created () {
    console.log('...', this.$store.state.currentUser)
  },
  methods: {
    updateUserInfo () {
      var displayName = this.displayName
      var email = this.email
      var phoneNumber = this.phoneNumber
      console.log({
        displayName, email, phoneNumber
      })
      this.updateProfile({ displayName, email, phoneNumber }).then(function (res) {
        // Update successful.
        console.log('更新成功')
      }).catch(function (error) {
        // An error happened.
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
