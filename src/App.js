import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/Index";

function App() {

  return (
    <Router>
      <>
        <Route path='/' exact render={() => (
          <>
            <Login />
          </>
        )} />
        <Route path='/QChallenge' component={Index} />
      </>
    </Router>
  );
}

export default App;
