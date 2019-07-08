import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={MainPage} />
        <Route path="/:type" component={MainPage} />
      </Router>
    </div>
  );
}

export default App;
