import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./Pages/MainPage";
import EachPersonDetails from "./Components/EachPersonDetails";
import CustomDialog from "./Components/CustomDialog";

function App() {
  return (
    <div className="App">
      <Router>
        <CustomDialog />
        <Route path="/" exact="true" component={MainPage} />
        <Route path="/:type" component={MainPage} />
        {/* <Route
          path="/character/:id"
          exact="true"
          component={EachPersonDetails}
        /> */}
      </Router>
    </div>
  );
}

export default App;
