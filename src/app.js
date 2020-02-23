import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Firebase, { FirebaseContext, useFirebase } from "./firebase";
import ProtectedRoute from "./protected-route";
import Layout from "./layout";
import Scale from "./scale";
import SignUp from "./sign-up";
import LogIn from "./log-in";
import Home from "./home";

const Content = () => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      firebase.auth.onAuthStateChanged(() => {
        setLoading(false);
      }),
    [firebase]
  );

  return (
    <Layout loading={loading}>
      <Switch>
        <ProtectedRoute path="/scale" component={Scale} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/log-in" component={LogIn} />
        <Route path="/" component={Home} />
      </Switch>
    </Layout>
  );
};

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Router>
        <Content />
      </Router>
    </FirebaseContext.Provider>
  );
};

export default App;
