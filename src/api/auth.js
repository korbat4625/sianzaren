import { dbAPI } from './db.js'
import { firebase, db } from '@/Model/FirebaseModel.js'
class AuthFunctions {
  constructor () {
    this.showMessage = true
    this.dbAPI = dbAPI
    this.db = db
    this.firebase = firebase
  }

  async checkLogin () {
    const mg = await dbAPI.getDBManagerInfo(this.showMessage, arguments[1])
    return mg
  }

  async signIn (acc, pass) {
    return await this.firebase.auth().signInWithEmailAndPassword(acc, pass).then(async () => {
      const uuid = this.currentUser().uid
      await this.updateManagerInfo(`${uuid}`, { online: true })
      return {
        uuid: uuid,
        status: 'success'
      }
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
  updateManagerInfo (id, data) {
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
