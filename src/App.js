import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/Index";
import { io } from "socket.io-client";


const socket = io('/');
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
      </>
    </Router>
  );
}

export default App;
