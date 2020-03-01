import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
    this.db = app.firestore();
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

  addWeight = ({ weight }) => {
    const newWeight = {
      weight,
      timestamp: app.firestore.Timestamp.fromDate(new Date()),
      userId: this.user.uid
    };
    console.log(newWeight);
    return this.db.collection("weights").add(newWeight);
  };

  getWeights = () =>
    this.db
      .collection("weights")
      .where("userId", "==", this.user.uid)
      .orderBy("timestamp", "desc")
      .limit(10)
      .get()
      .then(snapshot =>
        snapshot.docs.map(doc => {
          const { weight, timestamp } = doc.data();
          return {
            weight,
            timestamp: timestamp.toDate()
          };
        })
      );

  getLastWeight = () =>
    this.db
      .collection("weights")
      .where("userId", "==", this.user.uid)
      .orderBy("timestamp", "desc")
      .limit(1)
      .get()
      .then(snapshot => {
        const weights = snapshot.docs.map(doc => doc.data().weight);
        if (!weights.length) {
          return null;
        }
        return weights[0];
      });
}

export default Firebase;
