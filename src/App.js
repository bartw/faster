import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./layout";
import Scale from "./scale";
import SignUp from "./sign-up";
import LogIn from "./log-in";
import Home from "./home";

const App = () => (
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
);

export default App;
