import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
	apiKey: "AIzaSyB-OY9AdscCxfGO3e3OLtAHXFT3EPDnakk",
	authDomain: "fitgym-f148b.firebaseapp.com",
	projectId: "fitgym-f148b",
	storageBucket: "fitgym-f148b.appspot.com",
	messagingSenderId: "336439152985",
	appId: "1:336439152985:web:3d4cec4f080417a4043c48"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export default firebaseApp;
export { db };
