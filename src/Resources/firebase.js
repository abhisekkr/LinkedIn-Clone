import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBLiI3UFqDN7SU7VF-q5K56tvrNNjWfoMk",
	authDomain: "linkedin-clone-33414.firebaseapp.com",
	projectId: "linkedin-clone-33414",
	storageBucket: "linkedin-clone-33414.appspot.com",
	messagingSenderId: "809132683549",
	appId: "1:809132683549:web:7bd55366230bbed222b1f4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const imageConfig = {
	quality: 0.2,
	maxWidth: 800,
	maxHeight: 600,
	autoRotate: true,
};

export { db, auth, imageConfig, storage };
