import { db } from '@/Model/FirebaseModel.js'
const dbApi = {
  async getDBManagerInfo (showSourceMsg) {
    const mgI = window.cookieTool.get('siaZA')
    const managers = db.collection('managers').doc(mgI)
    return await new Promise((resolve, reject) => {
      managers.get().then(function (doc) {
        if (doc.exists) {
          console.log('來自getDBManagerInfo的訊息，抓到的指定管理者資訊為:', doc.data())
          resolve(doc.data())
        } else reject(new Error('fail'))
      }).catch(function (error) {
        console.log('Error getting document:', error)
      })
    })
  }
}

export { dbApi }
