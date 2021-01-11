import { db } from '@/Model/FirebaseModel.js'
const dbAPI = {
  // 這裡有siaZA為null的問題
  async getDBManagerInfo (showSourceMsg = false) {
    const userUUID = window.cookieTool.get('siaZA')
    if (!userUUID) return { online: false }
    const managers = db.collection('managers').doc(userUUID)

    console.log('cookie uuid沒問題，開始查詢使用者資料', arguments[1] + '呼叫了DB查詢...')
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
