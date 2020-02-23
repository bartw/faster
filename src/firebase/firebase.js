import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.user = null;

    this.auth.onAuthStateChanged(user => {
      this.user = user ? user : null;
    });
  }

  signUp = ({ email, password }) =>
    this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.user = user;
      return user;
    });

  logIn = ({ email, password }) =>
    this.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.user = user;
      return user;
    });

  logOut = () =>
    this.auth.signOut().then(() => {
      this.user = null;
    });

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  getUser = () => (this.user ? { ...this.user } : null);
}

export default Firebase;
