import { db } from '@/Model/FirebaseModel.js'
console.log('window:: ', window)
const dbAPI = {
  async getDBManagerInfo (showSourceMsg = false) {
    const mgI = window.cookieTool.get('siaZA')
    const managers = db.collection('managers').doc(mgI)
    if (showSourceMsg) {
      console.log('mgI:', mgI)
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
