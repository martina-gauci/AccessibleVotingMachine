import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import getCandidates from "./candidatelist";
import Filter from "./components/filter";
import Candidates from "./components/candidates";
import Preferences from "./components/preferences";
import ReviewVote from "./components/review";
import CastVote from "./components/cast";
import SubmitComment from "./components/comment";
import Help from "./components/help";
import Finish from "./components/finish";

function App() {
  // if the loacl storage does not have the candidates, load them
  if (localStorage.getItem("candidates") === null) {
    localStorage.setItem("candidates", JSON.stringify(getCandidates()));
  }

  return (
    <React.Fragment>
      <Switch>
        {/* <Route path="/" exact component={Start} /> */}
        <Route path="/" exact component={Filter} />
        <Route path="/candidates" component={Candidates} />
        <Route path="/preferences" component={Preferences} />
        <Route path="/help" component={Help} />
        <Route path="/review" component={ReviewVote} />
        <Route path="/cast" component={CastVote} />
        <Route path="/submitComment" component={SubmitComment} />
        <Route path="/finish" component={Finish} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
