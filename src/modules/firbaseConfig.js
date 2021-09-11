import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDaWEK8HAStQJRiC5jPm-WDQemkTKiLCJQ",
    authDomain: "qchallenge-539fc.firebaseapp.com",
    projectId: "qchallenge-539fc",
    storageBucket: "qchallenge-539fc.appspot.com",
    messagingSenderId: "688414082981",
    appId: "1:688414082981:web:8088a7d654f24e5a728a4c",
    measurementId: "G-GXEELK4VW2"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
export default storage;


