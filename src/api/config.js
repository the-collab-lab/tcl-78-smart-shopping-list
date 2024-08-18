import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCAUGXpQs4ufarfPnZmP14FA76PxHUYsos',
	authDomain: 'tcl-78-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-78-smart-shopping-list',
	storageBucket: 'tcl-78-smart-shopping-list.appspot.com',
	messagingSenderId: '235897545753',
	appId: '1:235897545753:web:860df611d461bfebd5b688',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
