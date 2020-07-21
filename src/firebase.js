import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB0YXb6uWPLqcue21JqPrVHizyDtvEkXbc",
  authDomain: "svelte-crud-da81d.firebaseapp.com",
  databaseURL: "https://svelte-crud-da81d.firebaseio.com",
  projectId: "svelte-crud-da81d",
  storageBucket: "svelte-crud-da81d.appspot.com",
  messagingSenderId: "85278713221",
  appId: "1:85278713221:web:1fd614bf0e08a1ba5c50ec",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
