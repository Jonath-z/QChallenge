import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";


function App() {
  return (
    <Router>
      <>
        <Route path='/' exact render={() => (
          <div>
            <Login />
          </div>
        )} />
        <Route path='/QChallenge' component={Header} />
      </>
    </Router>
  );
}

export default App;
