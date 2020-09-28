<template>
  <b-container class="pageLogin">
    <b-row class="my-3" v-if="inOrUp === 1">
      <b-col sm="3">
        <label>請輸入帳號:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="account"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-3" v-if="inOrUp === 1">
      <b-col sm="3">
        <label>請輸入密碼:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input type="password" v-model="password"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-3" v-if="inOrUp === 2">
      <b-col cols="4">
        <b-card-group deck>
          <b-card  header="帳號相關" header-tag="header" class="m-3">
            <div role="group" class="m-3">
              <label for="account">帳號 (請用信箱格式):</label>
              <b-form-input
                id="account"
                type="email"
                v-model="account"
                trim
              ></b-form-input>
            </div>
            <div role="group" class="m-3">
              <label for="password">密碼:</label>
              <b-form-input
                id = "password"
                v-model="password"
                type="password"
                trim
              ></b-form-input>
            </div>
          </b-card>
        </b-card-group>
      </b-col>
      <b-col cols="4">
        <b-card-group deck>
          <b-card  header="名稱相關" header-tag="header" class="m-3">
            <div role="group" class="m-3">
              <label for="">顯示暱稱:</label>
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
      </b-col>
      <b-col cols="4">
        <b-card-group deck>
          <b-card header="聯絡資訊" header-tag="header" class="m-3">
            <div role="group" class="m-3">
              <label for="backupEmail">備用信箱:</label>
              <b-form-input
                id = "backupEmail"
                type="email"
                v-model="backupEmail"
                trim
              ></b-form-input>
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
      password: '',
      backupEmail: '',
      displayName: '',
      name: '',
      phoneNumber: '',
      address: ''
    }
  },

  mounted () {
    this.setStatus.prevStatus = 1
  },

  components: {
    cButton
  },

  methods: {
    setStatus (status) {
      this.inOrUp = status
      if (status !== this.setStatus.prevStatus) this.setActive = !this.setActive
      this.setStatus.prevStatus = status
    },
    submit () {
      switch (this.inOrUp) {
        case 1:
          this.F_signIn(this.account, this.password)
          break
        case 2: {
          const user = {
            account: this.account,
            password: this.password,
            displayName: this.displayName,
            name: this.name,
            backupEmail: this.backupEmail,
            phoneNumber: this.phoneNumber,
            address: this.address
          }
          this.F_signUp(user).then(() => {
            this.F_showUser().then(newUser => {
              if (newUser.uid === null) return
              user.uid = newUser.uid
              user.online = true
              user.registerTime = new Date().getTime()
              this.F_setManagerData(user)
              this.$router.push(`/backend/${newUser.uid}`)
            }).catch(error => {
              console.error(error)
            })
          }).catch(error => {
            console.log(error)
          })
          break
        }
        default: break
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

.card-deck {
  height: 100%;
}
</style>
