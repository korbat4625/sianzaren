import { firebase } from '@/Model/FirebaseModel.js'
// import { authAPI } from './auth'
// import store from '@/store/index.js'

const userAPI = {
  currentUser () {
    return firebase.auth().currentUser
  },

  loginStateWatcher (showSource = false) {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) window.cookieTool.set('siaZA', user.uid, 60 * 60 * 24)
      else {
      }
    })
  }
}

export { userAPI }
