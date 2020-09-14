<template>
  <b-container class="pageLogin">
    <b-row class="my-3">
      <b-col sm="3">
        <label>請輸入帳號:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="account"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col sm="3">
        <label>請輸入密碼:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input type="password" v-model="password"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="3" class="status">請選擇登入或註冊: </b-col>
      <b-col sm="9">
        <div class="status">
          <span @click="setStatus(1)" :class="{ active: setActive }">登入</span>
          <span @click="setStatus(2)" :class="{ active: !setActive }">註冊</span>
          <!-- <input v-model="inOrUp" type="text" style="display: block;"> -->
        </div>
      </b-col>
    </b-row>
    <c-button variant="primary" @click.native="submit">送出</c-button>
  </b-container>
</template>

<script>
import cButton from '../components/CButton.vue'
import { firebase } from '../Model/FirebaseModel'

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName
    var email = user.email
    var emailVerified = user.emailVerified
    var photoURL = user.photoURL
    var isAnonymous = user.isAnonymous
    var uid = user.uid
    var providerData = user.providerData
    // ...
    console.log('使用者資訊: ', {
      displayName,
      email,
      emailVerified,
      photoURL,
      isAnonymous,
      uid,
      providerData
    })
  } else {
    // User is signed out.
    // ...
  }
})

export default {
  name: 'Login',
  data () {
    return {
      types: [
        'email',
        'password'
      ],
      setActive: true,
      inOrUp: 1,
      account: '',
      password: ''
    }
  },
  components: {
    cButton
  },
  mounted () {
    this.setStatus.prevStatus = 1
  },
  methods: {
    setStatus (status) {
      console.log(status)
      this.inOrUp = status
      if (status !== this.setStatus.prevStatus) this.setActive = !this.setActive
      this.setStatus.prevStatus = status
    },
    submit () {
      console.log([this.account, this.password, this.inOrUp])
      switch (this.inOrUp) {
        case 1:
          firebase.auth().signInWithEmailAndPassword(this.account, this.password).then(() => {
            console.log('登入成功')
            this.$router.push('/backend')
          }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            console.error(errorCode, errorMessage)
          })
          break
        case 2:
          firebase.auth().createUserWithEmailAndPassword(this.account, this.password).then(() => {
            console.log('註冊成功')
            this.$router.push('/backend')
          }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            console.error(errorCode, errorMessage)
          })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pageLogin {
  padding: 2rem;
}

.status {
  padding: 1rem;
  & > span {
    user-select: none;
    cursor: pointer;
    margin: .5rem 1rem .5rem 0;
    padding: .5rem;
    border-radius: 5px;

    &:hover {
      background-color: #ccc;
    }
  }
}

.active {
  background-color: #595;
  color: white;
}
</style>
