import * as firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCZ-daOtD7h7k4DkilmyQF6BV0LBIOzl-o',
  authDomain: 'project-moonshot-55b8e.firebaseapp.com',
  databaseURL: 'https://project-moonshot-55b8e.firebaseio.com',
  projectId: 'project-moonshot-55b8e',
  storageBucket: 'project-moonshot-55b8e.appspot.com',
  messagingSenderId: '924931571453',
  appId: '1:924931571453:web:05f83d1ffa96abc5078894',
  measurementId: 'G-97E7JZBGP1',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
