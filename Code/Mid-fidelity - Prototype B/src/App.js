import React from "react";
import "./App.css";
import Help from "./components/help";
import Start from "./components/start";
import Filter from "./components/filter";
import Candidates from "./components/candidates";
import Preferences from "./components/preferences";
import CastVote from "./components/castVote";
import { Route, Switch } from "react-router-dom";
import getCandidates from "./candidatelist";
import ReviewVote from "./components/reviewVote";

function App() {
  // if the loacl storage does not have the candidates, load them
  if (localStorage.getItem("candidates") === null) {
    localStorage.setItem("candidates", JSON.stringify(getCandidates()));
  }

  return (
    <React.Fragment>
      {/* the component displayed depends on the path */}
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/help" component={Help} />
        <Route path="/filter" component={Filter} />
        <Route path="/candidates" component={Candidates} />
        <Route path="/preferences" component={Preferences} />
        <Route path="/castvote" component={CastVote} />
        <Route path="/review" component={ReviewVote} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
