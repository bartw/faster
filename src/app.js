import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Firebase, { FirebaseContext } from "./firebase";
import Layout from "./layout";
import Scale from "./scale";
import SignUp from "./sign-up";
import LogIn from "./log-in";
import Home from "./home";

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/scale">
              <Scale />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/log-in">
              <LogIn />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </FirebaseContext.Provider>
  );
};

export default App;
