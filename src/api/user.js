import { firebase } from '@/Model/FirebaseModel.js'
import { dbAPI } from './db.js'
import store from '@/store/index.js'

const userAPI = {
  async getCurrentUser () {
    return await new Promise(resolve => {
      const user = firebase.auth().currentUser
      resolve(user)
    })
  },

  loginStateWatcher (showSource = false) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('watcher觸發有user:', user)
        let userInfo = {}
        window.cookieTool.set('siaZA', user.uid, 60 * 60 * 24)
        dbAPI.getDBManagerInfo(user.uid, 'loginStateWatcher').then(manager => {
          userInfo = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            name: manager.name,
            online: manager.online
          }
          console.log('watcher 調查db撈回來資料:', userInfo)
          store.commit('setCurrentUser', userInfo)
        })
      } else {
        const userInfo = {
          displayName: '',
          email: '',
          emailVerified: '',
          photoURL: '',
          phoneNumber: '',
          name: '',
          online: 'false'
        }
        store.commit('setCurrentUser', userInfo)
      }
    })
  }
}

export { userAPI }
