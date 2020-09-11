// Firebase App (the core Firebase SDK) is always required and must be listed first
// 這個等於當初第一個 script 標籤
import * as firebase from "firebase/app";

// 後面都是 import 第一個後才能接著 import 的各模塊
// 這個等於當初第二個 script 標籤
// 如果前面有開啟 google分析就加入這個 import，雖然我還沒用到 XD
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
// 這兩個剛好是我們後面需要的模塊 !! 一個是身分驗證，一個是 cloud firestore 雲端資料庫
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyACSYQJGSEBeocXzdn2ug_56XUJQApB_Kk",
  authDomain: "sianzaren.firebaseapp.com",
  databaseURL: "https://sianzaren.firebaseio.com",
  projectId: "sianzaren",
  storageBucket: "sianzaren.appspot.com",
  messagingSenderId: "240803393974",
  appId: "1:240803393974:web:113b5f7ebaac4f167e5117",
  measurementId: "G-M9JLJ36S8S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

class FirebaseService {
  constructor () {
    this.firebase = firebase
  }

  signIn () {

  }

  signUp () {

  }

  
}


export default FirebaseService
