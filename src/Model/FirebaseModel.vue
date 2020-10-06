<template>
  <span>
  </span>
</template>

<script>
import { firebase, db, storage } from './FirebaseModel.js'
export default {
  data () {
    return {
    }
  },
  methods: {
    async F_showUser (e, msg) {
      console.log('觸發了F_showUser')
      var user = firebase.auth().currentUser
      console.log(user, this.$store.state)
      // var name, email, photoUrl, uid, emailVerified
      if (user != null) return user
      else return null
    },

    F_signIn (account, password) {
      console.log('觸發了F_signIn')
      const self = this
      firebase.auth().signInWithEmailAndPassword(account, password).then(function () {
        console.log('登入成功')

        self.F_showUser().then(user => {
          console.log('user::', user)
          self.$router.push(`/backend/${user.uid}`)
        }).catch(error => {
          console.log(error)
        })
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
    },

    F_signUp (user) {
      return firebase.auth().createUserWithEmailAndPassword(user.account, user.password).then(function () {
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
    },

    async F_signOut () {
      console.log('觸發了F_signOut')
      const self = this
      await self.F_updateManagerInfo(self.$route.params.who, { online: false })
      firebase.auth().signOut().then(function () {
        self.$router.push('/')
        console.log('登出成功')
      })
    },

    F_updateArticle (data, addOrUpdate, attrs) {
      console.log('觸發了F_updateArticle')
      console.log(data, addOrUpdate, attrs)
      if (addOrUpdate === '更新') {
        console.log('走入更新')
        var docRef = db.collection('posts').doc(attrs.id)
        return docRef.update(data).then(function () {
          console.log('Document successfully updated!')
        }).catch(function (error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
      }
      console.log('走入更新就不會到這')
      db.collection('posts').add(data).then(function (res) {
        console.log('新增文章成功')
      }).catch(res => {
        console.log('新增文章失敗')
        console.log(res)
      })
    },

    F_stateWatcher () {
      console.log('監看者觸法')
      const self = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          let userInfo = {}
          self.F_getManagerInfo(user.uid).then(manager => {
            userInfo = {
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              phoneNumber: user.phoneNumber,
              name: manager.name
            }
            console.log('userInfouserInfouserInfo111111111:', userInfo)
            self.$store.commit('setCurrentUser', userInfo)
          })
        } else {
          self.$store.commit('setCurrentUser', {})
        }
      })
    },

    F_updateProfile (userInfo) {
      console.log('觸發了F_updateProfile', userInfo)
      var user = firebase.auth().currentUser
      return user.updateProfile({
        displayName: userInfo.displayName,
        photoURL: userInfo.photoURL
      })
    },

    F_checkLogin () {
      console.log('觸發了F_checkLogin')
      this.F_showUser().then(res => {
        console.log(res)
        if (res === null) this.$router.push('login')
        else this.$router.push(`backend/${res.uid}`)
      })
    },

    F_getCollectionDocsSort (collection, orderBy) {
      const docs = []
      return db.collection(collection).orderBy(orderBy.where, orderBy.order).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const data = doc.data()
          data.id = doc.id
          docs.push(data)
        })
        return docs
      })
    },

    F_setManagerData (user) {
      db.collection('managers').doc(user.uid).set({
        account: user.account,
        password: user.password,
        displayName: user.displayName,
        name: user.name,
        backupEmail: user.backupEmail,
        phoneNumber: user.phoneNumber,
        address: user.address,
        uid: user.uid,
        emailVerified: false,
        online: user.online,
        registerTime: user.registerTime
      }).catch(function (error) {
        console.error('Error writing document: ', error)
      })
    },

    F_getManagerInfo (id) {
      const managers = db.collection('managers').doc(id)
      return managers.get().then(function (doc) {
        if (doc.exists) return doc.data()
        else console.log('No such document!')
      }).catch(function (error) {
        console.log('Error getting document:', error)
        // pass
      })
    },

    F_updateManagerInfo (id, data) {
      console.log('要更新的 data: 要更新的 data: 要更新的 data: ', data)
      const managers = db.collection('managers').doc(id)
      return managers.update(data).then(function () {
        console.log('Document successfully updated!')
      }).catch(function (error) {
        console.error('Error updating document: ', error)
        // pass
      })
    },

    F_sendEmailVerified () {
      var user = firebase.auth().currentUser
      user.sendEmailVerification().then(function () {
        // Email sent.
      }).catch(function (error) {
        console.log(error)
      })
    },

    async F_getStorageURL (ref) {
      // Create a storage reference from our storage service
      var storageRef = storage.ref()
      var pathReference = storageRef.child(ref)
      return pathReference.getDownloadURL().then(function (url) {
        return url
      }).catch(function (error) {
      // Handle any errors
        console.log(error)
      })
    },

    F_uploadImg (file, ref) {
      const self = this
      if (ref.indexOf('managers/' + this.$store.state.name) !== -1) {
        const storageRef = storage.ref()
        const listToRemoveRef = storageRef.child('managers/' + this.$store.state.name)
        return listToRemoveRef.listAll().then(function (res) {
          res.items.forEach(function (itemRef) {
            console.log(itemRef)
            // Delete the file
            const deleteItem = storageRef.child('managers/' + self.$store.state.name + '/' + itemRef.name)
            deleteItem.delete().then(function () {
              console.log(itemRef.name + ' 刪除成功')
            }).catch(function (error) {
              console.log(error)
              // Uh-oh, an error occurred!
            })
          })
          const uploadRef = storageRef.child(ref)
          return uploadRef.put(file).then(function (snapshot) {
            console.log('Uploaded a blob or file!')
          })
        }).catch(function (error) {
          console.log(error)
          // Uh-oh, an error occurred!
        })
      }
    },

    async F_listStorageRef (ref) {
      const storageRef = storage.ref()
      const listToShow = storageRef.child(ref)
      return listToShow.listAll().then(function (res) {
        const item = []
        res.items.forEach(function (itemRef) {
          console.log('itemRefitemRefitemRef:', itemRef)
          item.push(itemRef)
        })
        return item
      }).catch(function (error) {
        console.log(error)
        // Uh-oh, an error occurred!
      })
    }
  }
}
</script>
