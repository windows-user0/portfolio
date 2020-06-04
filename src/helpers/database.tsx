import * as firebase from "firebase/app";
import "firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyCH7DK-nNzhNxLra0tSQIqYoDe4Le-GhlM",
  authDomain: "portfolio-5671f.firebaseapp.com",
  databaseURL: "https://portfolio-5671f.firebaseio.com",
  projectId: "portfolio-5671f",
  storageBucket: "portfolio-5671f.appspot.com",
  messagingSenderId: "636842043310",
  appId: "1:636842043310:web:817f02b8b7a84efc62ca3f",
};
export const database = firebase.initializeApp(firebaseConfig).database();
