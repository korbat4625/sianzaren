import { firebase } from '@/Model/FirebaseModel.js'
import { dbAPI } from './db.js'
import { authAPI } from './auth'
import store from '@/store/index.js'

const userAPI = {
  currentUser () {
    return firebase.auth().currentUser
  },

  loginStateWatcher (showSource = false) {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        window.cookieTool.set('siaZA', user.uid, 60 * 60 * 24)

        let userInfo = {}
        const uuid = user.uid
        await authAPI.updateManagerInfo(uuid, { online: true })
        dbAPI.getDBManagerInfo(user.uid).then(manager => {
          console.log('抓到資料 user:', manager)
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
