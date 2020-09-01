import React, { Component } from "react";
import "./App.css";
import Candidates from "./components/candidates";
import Navigation from "./components/navigation";
import ReviewVote from "./components/reviewVote";
import Help from "./components/help";
import { confirmAlert } from "react-confirm-alert";
import getCandidates from "./candidates";

class App extends Component {
  constructor() {
    super();
    this.state = {
      //Get the candidates and their information from candidates.js
      candidates: getCandidates(),
      selectedCandidate: 0,
      preference: 1
    };
  }

  componentDidMount() {
    //Check if the candidates are stored in local storage
    if (localStorage.getItem("candidates") === null) {
      //If not, get the candidates from the state and store them in local storage
      //This means the app has just been launched so there are no preferences assigned
      localStorage.setItem("candidates", JSON.stringify(this.state.candidates));
    } else {
      //If they are being stored retreive them to check if there are any assigned preferences
      const candidates = localStorage.getItem("candidates");
      this.setState({ candidates: JSON.parse(candidates) });

      //Get the preferences that have been assigned
      var preferences = JSON.parse(candidates)
        .sort((a, b) => a.preference - b.preference)
        .map(c => c.preference);

      //Create a set from the preferences array to eliminate any doubles
      //Only 0s will be repeated as a preference cannot be assigned to multiple pleople
      //This will prevent the following for loop from runing a number of times for no reason
      var unique = [...new Set(preferences)];

      var next = 0;

      //Loop through all the values in the set to find missing numbers in the sequence
      for (var i = 1; i < unique.length; i++) {
        if (unique[i] - unique[i - 1] !== 1) {
          //If a missing number is found in the sequence, store it to be asked for
          next = unique[i - 1] + 1;
          break;
        }
      }

      //If no missing value is found, find the largest value in the set and add 1
      if (next === 0) {
        next = Math.max(...unique) + 1;
      }

      //Store the next preference to be asked for
      this.setState({ preference: next });
    }
  }

  handleSelection = id => {
    //Store the currently selected candidate in the state
    this.setState({ selectedCandidate: id });
  };

  handlePreferenceAssignment = () => {
    //Check if a candidate is selected
    if (this.state.selectedCandidate !== 0) {
      //Since only the id is stored, retrieve all the candidate details
      const candidates = [...this.state.candidates];
      const candidate = candidates.find(
        c => c.id === this.state.selectedCandidate
      );
      //Reset the state variable
      this.setState({ selectedCandidate: 0 });

      //Edit the candidates array to store the newly assigned preference
      const index = candidates.indexOf(candidate);
      candidates[index] = { ...candidate };
      candidates[index].preference = this.state.preference;
      this.setState({ candidates });

      //Prepare to ask for the next assignment
      const preference = parseInt(this.state.preference) + 1;
      this.setState({ preference: preference });

      //Store the edited candidates and the next preference in local storage
      localStorage.setItem("candidates", JSON.stringify(candidates));
      localStorage.setItem("preference", this.state.preference);

      //Refresh the page and scroll to the top of the page
      window.location.reload();
      window.scrollTo(0, 0);
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="confirm-alert" role="alert">
              <h1>Please choose a candidate</h1>
              <p>Tap on a candidate to choose it before tapping next.</p>
              <button className="confirm-btn" onClick={onClose}>
                OK
              </button>
            </div>
          );
        }
      });
    }
  };

  render() {
    //Get the pathname from the URL and choose the component/s to show based on it
    const route = window.location.pathname;
    if (route === "/review")
      return <ReviewVote allCandidates={this.state.candidates} />;

    if (route === "/help") {
      return <Help />;
    }
    return (
      <div>
        <Candidates
          listOfCandidates={this.state.candidates}
          selectedCandidateId={this.state.selectedCandidate}
          onSelectCandidate={this.handleSelection}
          preference={this.state.preference}
        />
        <Navigation
          assignPreference={this.handlePreferenceAssignment}
          listOfCandidates={this.state.candidates}
          preference={this.state.preference}
        />
      </div>
    );
  }
}
export default App;
