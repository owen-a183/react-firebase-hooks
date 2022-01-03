import * as firebase from "firebase";
import "firebase/database";

let config = {
  databaseURL: "https://perpus-a79ae-default-rtdb.asia-southeast1.firebasedatabase.app/",
  apiKey: "AIzaSyCFsb66jP6uXn9u7T4Qcjw5sdAUfmDD_4k",
  authDomain: "perpus-a79ae.firebaseapp.com",
  projectId: "perpus-a79ae",
  storageBucket: "perpus-a79ae.appspot.com",
  messagingSenderId: "69504804454",
  appId: "1:69504804454:web:efb396811febd847b0efa7",
  measurementId: "G-9069QB2TTE"
};

firebase.initializeApp(config);

export default firebase.database();
