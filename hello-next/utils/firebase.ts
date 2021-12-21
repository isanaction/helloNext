
import { firebaseConfig } from '../keys/firebase'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
