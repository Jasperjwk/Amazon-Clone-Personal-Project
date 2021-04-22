import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBZBpCGTTaeeG-AKRB3c_PXko11tV4-K1I",
    authDomain: "clone-personal-project-ffbc3.firebaseapp.com",
    projectId: "clone-personal-project-ffbc3",
    storageBucket: "clone-personal-project-ffbc3.appspot.com",
    messagingSenderId: "784192832754",
    appId: "1:784192832754:web:5d10344298b0e8ddc8bc6b",
    measurementId: "G-LLR8HHYVF3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  // Give me the variables to handle all the signing in
  const auth = firebase.auth();

  export {db, auth};