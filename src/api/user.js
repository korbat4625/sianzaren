import { firebase } from '@/Model/FirebaseModel.js'
import { dbApi } from './db.js'
import store from '@/store/index.js'

const userApi = {
  async getCurrentUser () {
    return await new Promise(resolve => {
      const user = firebase.auth().currentUser
      resolve(user)
    })
  },

  loginStateWatcher (showSource = false) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let userInfo = {}
        dbApi.getDBManagerInfo(user.uid).then(manager => {
          userInfo = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            name: manager.name,
            online: manager.online
          }
          store.commit('setCurrentUser', userInfo)
          if (showSource) {
            console.log('來自監看者的完整訊息, 監看者會將使用者的狀態寫入Vuex store內')
            console.log('指定查看的db內管理者資訊: ', manager)
            console.log('查看app store: ', store.state)
          }
        })
      } else {
        store.commit('setCurrentUser', {})
      }
    })
  }
}

export { userApi }
