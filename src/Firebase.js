import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDHKsV4AazoQQoeziyqcu0cYSL266c20CA",
    authDomain: "instagram-clone-fba53.firebaseapp.com",
    projectId: "instagram-clone-fba53",
    storageBucket: "instagram-clone-fba53.appspot.com",
    messagingSenderId: "229325411661",
    appId: "1:229325411661:web:a8c3ff398588bfe0ead304"
  };
  
  // Initialize Firebase
  const app =  firebase.initializeApp(firebaseConfig); 
  const auth =firebase.auth()
  const storage=firebase.storage()

  const db=app.firestore()

export {auth,db,storage}