import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.user = null;

    this.auth.onAuthStateChanged(user => {
      console.log('onAuth')
      this.user = user ? user : null;
    });
  }

  signUp = ({ email, password }) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  logIn = ({ email, password }) =>
    this.auth.signInWithEmailAndPassword(email, password);

  logOut = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  getUser = () => (this.user ? { ...this.user } : null);
}

export default Firebase;
