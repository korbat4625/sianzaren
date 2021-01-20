<template>
  <b-container class="pageLogin">
    <b-row>
      <b-col sm="8 status d-flex" offset-sm="2">
        <b-button pill variant="outline-primary" @click="setStatus(1)" :class="{ active: setActive }">登入</b-button>
        <div class="icon-size-black" @click="swapBtn"><b-icon icon="arrow-left-right"></b-icon></div>
        <b-button pill variant="outline-primary" @click="setStatus(2)" :class="{ active: !setActive }">註冊</b-button>
      </b-col>
    </b-row>
    <b-row class="my-3" v-if="inOrUp === 1">
      <b-col sm="8" offset="2">
        <label>請輸入帳號:</label>
        <b-form-input v-model="loginAcc"></b-form-input>
        <label>請輸入密碼:</label>
        <b-form-input type="password" v-model="loginPsd"></b-form-input>
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
      <b-col cols="4 d-flex justify-content-center align-items-center" offset-sm="4">
        <b-button variant="primary" @click="submit">送出</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from '../Model/FirebaseModel.vue'
import { authAPI } from '@/api/auth'
export default {
  name: 'handsomeLogin',
  mixins: [firebase],
  data () {
    return {
      loginAcc: '',
      loginPsd: '',

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

  methods: {
    swapBtn () {
      if (this.inOrUp === 1) {
        this.inOrUp = 2
        this.setActive = false
      } else {
        this.inOrUp = 1
        this.setActive = true
      }
    },
    setStatus (status) {
      this.inOrUp = status
      if (this.status === 1) this.setActive = true
      else this.setActive = false
    },
    submit () {
      if (this.inOrUp === 1) authAPI.signIn(this.loginAcc, this.loginPsd)
      if (this.inOrUp === 2) {
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
      }
    }
  }
}
</script>

<style lang="scss">
.pageLogin {
  padding: $page-level-pd;
}

div.label--left {
  padding: 1rem;
  padding-left: 0px;
}

.status {
  padding: 1rem;
  display: flex;
  div {
    position: relative;
  }

  & > div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    & > svg {
      cursor: pointer;
    }
  }

  & > div:not(:nth-child(2)) {
    user-select: none;
    cursor: pointer;
    padding: $base-pd;
    border-radius: 5px;

    &:hover {
      background-color: #ccc;
    }
  }
}

.card-deck {
  height: 100%;
}
</style>
