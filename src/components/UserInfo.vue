<template>
  <div class="container">
    <b-card-group deck>
      <b-card title="Title" class="m-3">
        <div role="group" class="m-3">
          <label for="displayName">暱稱:</label>
          <b-form-input
            v-model="displayName"
            id = "displayName"
            trim
          ></b-form-input>
        </div>
        <div role="group" class="m-3">
          <label for="name">姓名:</label>
          <b-form-input
            v-model="name"
            id = "name"
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
            v-model="email"
            id = "email"
            trim
          ></b-form-input>
        </div>
        <div role="group" class="m-3">
          <label for="phoneNumber">電話號碼:</label>
          <b-form-input
            v-model="phoneNumber"
            id = "phoneNumber"
            trim
          ></b-form-input>
        </div>
        <div role="group" class="m-3">
          <label for="address">住址:</label>
          <b-form-input
            v-model="address"
            id = "address"
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
      email: '',
      phoneNumber: '',
      name: '',
      address: '',
      skills: '',
      intro: '',
      photoURL: ''
    }
  },
  methods: {
    updateUserInfo () {
      const info = {}
      info.displayName = this.displayName
      info.email = this.email
      info.phoneNumber = this.phoneNumber
      info.address = this.address
      info.skills = this.skills
      info.intro = this.intro
      info.photoURL = this.photoURL
      info.online = true

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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
