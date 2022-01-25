import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB4Twy9gAgkbnP9jP3idwFxhw5W0zhHn40",
  authDomain: "my-project-5c404.firebaseapp.com",
  projectId: "my-project-5c404",
  storageBucket: "my-project-5c404.appspot.com",
  messagingSenderId: "695415109664",
  appId: "1:695415109664:web:0257043ec580f5e634e445",
};

const app =
  firebase.apps && firebase.apps.length > 0
    ? firebase.apps[0]
    : firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.firestore();
const storage = app.storage();
/* const provider = new FacebookAuthProvider(); */

export { db, auth, storage /* provider */ };
