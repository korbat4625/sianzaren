import { db } from '@/Model/FirebaseModel.js'
const dbAPI = {
  // 這裡有siaZA為null的問題
  async getDBManagerInfo (showSourceMsg = false) {
    console.log('getDBManagerInfo arguments:', arguments)
    const userUUID = window.cookieTool.get('siaZA')
    if (userUUID === 'undefined' || userUUID === null || !userUUID) return { online: false }
    const managers = db.collection('managers').doc(userUUID)
    console.log('userUUID:', userUUID)
    if (showSourceMsg) {
      console.log('userUUID:', userUUID)
    }
    return await new Promise((resolve, reject) => {
      managers.get().then(function (doc) {
        if (doc.exists) resolve(doc.data())
        else reject(new Error('fail'))
      }).catch(function (error) {
        console.log('Error getting document:', error)
      })
    })
  }
}

export { dbAPI }
