import { firebase } from '@/Model/FirebaseModel.js'
import { authAPI } from './auth'
import store from '@/store/index.js'
import { router } from '@/router/index.js'

const userAPI = {
  currentUser () {
    return firebase.auth().currentUser
  },

  loginStateWatcher (showSource = false) {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        window.cookieTool.set('siaZA', user.uid, 60 * 60 * 24)
        const uuid = user.uid
        await authAPI.updateManagerInfo(uuid, { online: true })
        router.replace({ path: '/backend/' + uuid })
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
