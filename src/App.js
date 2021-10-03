import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/Index";
import Account from "./components/Account";

function App() {

  return (
    <Router>
      <>
        <Route path='/' exact render={() => (
          <>
            {window.localStorage.clear()}
            <Login />
          </>
        )} />
        <Route path='/QChallenge' component={Index} />
        <Route path='/Account' component={Account}/>
      </>
    </Router>
  );
}

export default App;
