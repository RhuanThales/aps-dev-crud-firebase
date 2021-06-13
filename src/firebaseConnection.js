import firebase from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
if(!firebase.apps.lenght) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;