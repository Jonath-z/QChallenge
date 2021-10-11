import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/Index";
import Account from "./components/Account";
import Help from "./components/help/Help";

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
        <Route path='/Account' component={Account} />
        <Route path='/Help' component={Help}/>
      </>
    </Router>
  );
}

export default App;
