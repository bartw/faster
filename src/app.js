import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Firebase, { FirebaseContext } from "./firebase";
import ProtectedRoute from "./protected-route";
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
            <ProtectedRoute path="/scale" component={Scale} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/log-in" component={LogIn} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </Router>
    </FirebaseContext.Provider>
  );
};

export default App;
