import { dbAPI } from './db.js'
import { firebase, db } from '@/Model/FirebaseModel.js'
import store from '../store/index'
class AuthFunctions {
  constructor () {
    this.showMessage = true
    this.dbAPI = dbAPI
    this.db = db
    this.firebase = firebase
  }

  async checkLogin () {
    const mg = await dbAPI.getDBManagerInfo(this.showMessage)
    console.log('ck::', mg)
    return mg
  }

  signIn (acc, pass) {
    return this.firebase.auth().signInWithEmailAndPassword(acc, pass).then(async () => {
      await this.updateManagerInfo(this.currentUser().uid, { online: true })
      const mg = await this.checkLogin()
      const userInfo = {
        displayName: mg.displayName,
        email: mg.account,
        emailVerified: mg.emailVerified,
        photoURL: mg.photoURL,
        phoneNumber: mg.phoneNumber,
        name: mg.name,
        online: mg.online
      }
      store.commit('setCurrentUser', userInfo)
      return this.currentUser()
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      console.error(errorCode, errorMessage)
    })
  }

  currentUser (e, msg) {
    console.log('觸發了F_currentUser')
    return this.firebase.auth().currentUser
  }

  /**
  * 更新 user id 所代表人物的各資料狀態
  * @async
  * @param {string} id - user id，為類似uuid的使用者識別碼
  * @param {object} data - 要更新的資料
  */
  async updateManagerInfo (id, data) {
    const managers = this.db.collection('managers').doc(id)
    return managers.update(data).then(function () {
      console.log('Document successfully updated!')
    }).catch(function (error) {
      console.error('Error updating document: ', error)
      // pass
    })
  }
}

const authAPI = new AuthFunctions()
export { authAPI }
