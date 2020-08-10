import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCoyAtwJ5xdtA5M-LgjsWxzB0MaC-k81Wo',
  authDomain: 'react-firebase-crud-rifandani.firebaseapp.com',
  databaseURL: 'https://react-firebase-crud-rifandani.firebaseio.com',
  projectId: 'react-firebase-crud-rifandani',
  storageBucket: 'react-firebase-crud-rifandani.appspot.com',
  messagingSenderId: '398940643695',
  appId: '1:398940643695:web:5eff3f6181933dcc27489a',
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.app = app;
    this.auth = app.auth();
    this.db = app.firestore();
  }

  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password,
    );

    return newUser.user.updateProfile({
      displayName: name,
      // photoURL: 'www.image.com/user.jpg'
    });
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  resetPassword(email) {
    return this.auth.sendPasswordResetEmail(email);
  }
}

const firebase = new Firebase();
export default firebase;
