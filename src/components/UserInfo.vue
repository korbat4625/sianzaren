<template>
  <div class="container">
    <b-card-group deck>
      <b-card title="Title" class="m-3">
        <b-card-title>Card Title</b-card-title>
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
          <b-form-input
            v-model="skills"
            id = "skills"
            trim
          ></b-form-input>
        </div>
        <div role="group" class="m-3">
          <label for="intro">自我介紹:</label>
          <b-form-input
            v-model="intro"
            id = "intro"
            trim
          ></b-form-input>
        </div>
      </b-card>
    </b-card-group>

    <b-button @click.native="updateUserInfo" href="#" variant="primary" class="m-3">更新資料</b-button>

    <b-card title="Cardf suaafbtitle" sub-title="Card subtitle">
      <b-card-text>
        Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
        content.
      </b-card-text>

      <b-card-text>A second paragraph of text in the card.</b-card-text>

      <a href="#" class="card-link">Card link</a>
      <b-link href="#" class="card-link">Another link</b-link>
    </b-card>

  </div>
</template>

<script>
export default {
  name: 'UserInfoEditor',
  data () {
    return {
      displayName: this.$store.state.currentUser.displayName,
      email: this.$store.state.currentUser.email,
      phoneNumber: '',
      name: '',
      address: '',
      skills: '',
      intro: ''
    }
  },
  created () {
    console.log('...', this.$store.state.currentUser)
  },
  methods: {
    updateUserInfo () {
      const info = {}
      info.displayName = this.displayName
      info.email = this.email
      info.phoneNumber = this.phoneNumber
      console.log(info)
      this.updateProfile(info).then(function (res) {
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
