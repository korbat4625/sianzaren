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
      const self = this
      return firebase.auth().signInWithEmailAndPassword(account, password).then(function () {
        self.F_showUser().then(user => {
          self.F_updateManagerInfo(`${user.uid}`, { online: true })
          self.$router.replace(`/backend/${user.uid}`)
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
      const self = this
      await self.F_updateManagerInfo(self.$route.params.who, { online: false })
      return firebase.auth().signOut().then(function () {
        self.$router.replace('/')
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
      })
    },

    F_stateWatcher () {
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
            self.$store.commit('setCurrentUser', userInfo)
          })
        } else {
          self.$store.commit('setCurrentUser', {})
        }
      })
    },

    F_updateProfile (userInfo) {
      var user = firebase.auth().currentUser
      return user.updateProfile({
        displayName: userInfo.displayName,
        photoURL: userInfo.photoURL
      })
    },

    F_checkLogin () {
      return this.F_showUser().then(res => {
        console.log(res)
        if (res === null) this.$router.replace('HandsomeLogin')
        else this.$router.replace(`backend/${res.uid}`)
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
      return db.collection('managers').doc(user.uid).set({
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
      return user.sendEmailVerification().then(function () {
        // Email sent.
      }).catch(function (error) {
        console.log(error)
      })
    },

    F_getStorageURL (ref) {
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
      const storageRef = storage.ref()
      const uploadRef = storageRef.child(ref)
      if (ref.indexOf('managers/' + this.$store.state.name) !== -1) {
        const listToRemoveRef = storageRef.child('managers/' + this.$store.state.name)
        return listToRemoveRef.listAll().then(function (res) {
          res.items.forEach(function (itemRef) {
            // Delete the file
            const deleteItem = storageRef.child('managers/' + self.$store.state.name + '/' + itemRef.name)
            deleteItem.delete().then(function () {
              console.log(itemRef.name + ' 刪除成功')
            }).catch(function (error) {
              console.log(error)
              // Uh-oh, an error occurred!
            })
          })
          return uploadRef.put(file).then(function (snapshot) {
            console.log('Uploaded a blob or file!')
          })
        }).catch(function (error) {
          console.log(error)
          // Uh-oh, an error occurred!
        })
      } else {
        return uploadRef.put(file).then(function (snapshot) {
          console.log('Uploaded a blob or file!')
        })
      }
    },

    async F_listStorageRef (ref) {
      const storageRef = storage.ref()
      const listToShow = storageRef.child(ref)
      return listToShow.listAll().then(function (res) {
        const item = []
        res.items.forEach(function (itemRef) {
          item.push(itemRef)
        })
        return item
      }).catch(function (error) {
        console.log(error)
      })
    },

    F_uploadFiles_with_watcher (ref, file) {
      return new Promise((resolve, reject) => {
        const storageRef = storage.ref()
        const self = this
        // Create the file metadata
        // var metadata = {
        //   contentType: 'image/jpeg'
        // }

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child(ref).put(file)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            self.$store.commit('setUploadProgress', { status: 'Upload is ' + progress + '% done' })
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused')
                break
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running')
                break
            }
          }, function (error) {
            // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.log('目前使用者無權限上傳檔案')
                break

              case 'storage/canceled':
                // User canceled the upload
                console.log('使用者取消上傳檔案')
                break

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                console.log('未知的錯誤', error)
                break
            }
          }, function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log(file.name + '上船完成', downloadURL)
              self.$store.commit('setUploadProgress', { status: '上傳完成' })
              resolve(downloadURL)
            })
          })
      })
    },

    deleteAllImg () {
      const listToRemoveRef = 'posts/img/' + this.$route.params.who
      return this.F_listStorageRef(listToRemoveRef).then(list => {
        console.log(list)
        list.forEach(item => {
          const storageRef = storage.ref()
          const toDelete = storageRef.child(item.fullPath)
          toDelete.delete()
        })
        return 'done'
      })
    },

    F_deleteImg (imgName) {
      const storageRef = storage.ref()
      var desertRef = storageRef.child('posts/img/' + this.$route.params.who + '/' + imgName)
      desertRef.delete().then(function () {
        console.log('刪除成功')
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
