import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBUyRpxe0hDWlMSs7PWj6qVlFvd7tOZhaM',
  authDomain: 'b-ing-database.firebaseapp.com',
  projectId: 'b-ing-database',
  storageBucket: 'b-ing-database.firebasestorage.app',
  messagingSenderId: '101602010144',
  appId: '1:101602010144:web:6a0c3a54e2215050668845',
  measurementId: 'G-PNPZKZL1C8',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

console.log('2B ING: Firebase Connected Successfully!')
