import { db } from '@/Model/FirebaseModel.js'
const dbAPI = {
  // 這裡有siaZA為null的問題
  async getDBManagerInfo (showSourceMsg = false) {
    const userUUID = window.cookieTool.get('siaZA')
    if (!userUUID) return { online: false }
    const managers = db.collection('managers').doc(userUUID)

    return managers.get().then(function (doc) {
      if (doc.exists) return doc.data()
    }).catch(function (error) {
      console.log('Error getting document:', error)
    })
  }
}

export { dbAPI }
