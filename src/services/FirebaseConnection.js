import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAV0jIxZ7NpFCeAh1z5_GvnWi0SWe4fnCY",
    authDomain: "todo-9290f.firebaseapp.com",
    projectId: "todo-9290f",
    storageBucket: "todo-9290f.appspot.com",
    messagingSenderId: "184361725219",
    appId: "1:184361725219:web:452500bb5e1b5d28ab7096",
    measurementId: "G-J1WKKD2L9N"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;