import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../assets/config/firebase';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export default firebase;
