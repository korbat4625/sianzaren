import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    displayName: '',
    name: '',
    emailVerified: '',
    email: '',
    photoURL: '',
    phoneNumber: '',
    uploadProgress: ''
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.displayName = currentUser.displayName
      state.name = currentUser.name
      state.emailVerified = currentUser.emailVerified
      state.email = currentUser.email
      state.photoURL = currentUser.photoURL
      state.phoneNumber = currentUser.phoneNumber
    },

    setUploadProgress (state, progress) {
      state.uploadProgress = progress.status
    },

    clearProgress (state) {
      state.uploadProgress = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
