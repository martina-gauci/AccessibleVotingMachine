import React, { Component } from "react";
import Alert from "./alert";
import backicon from "../icons/back.png";
import deleteicon from "../icons/delete-circle.png";

class Preferences extends Component {
  state = { display: 0 };
  getStyle(num) {
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    var candidate = null;
    // Get the candidate with that preference
    candidate = candidates.filter(c => c.preference === num);

    // If a candidate with that preference if found, hide the number so that the user cannot select it
    // This prevents having multiple candidates with the same preference (causing an invalid vote)
    if (candidate.length > 0) {
      return "number hidden";
    }

    return "number";
  }

  checkCurrentPreference(candidateName) {
    // Retrieve the candidate for local storage
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    // Find the candidate and return his preference
    var candidate = candidates.find(c => c.name === candidateName);
    if (candidate.preference !== 0) {
      var message1 =
        candidateName +
        " is already assign preference number " +
        candidate.preference +
        ".";
      var message2 =
        "If you do not wish to change this preference tap on the back button at the bottom-left of the screen";
      var message3 =
        "To unassign " +
        candidateName +
        " from their current preference tap the delete preference button at the bottom of the page";

      return (
        <div className="alert">
          <p>{message1}</p>
          <p>{message2}</p>
          <p>{message3}</p>
        </div>
      );
    } else {
      return "";
    }
  }

  displayDeleteBtn(candidateName) {
    // Retrieve the candidate for local storage
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    // Find the candidate and return his preference
    var candidate = candidates.find(c => c.name === candidateName);
    if (candidate.preference !== 0) {
      return (
        <button
          className="delete-btn"
          onClick={() => this.setState({ display: 1 })}
        >
          <img className="delete-icon" alt="" src={deleteicon} />
          Delete preference
        </button>
      );
    } else {
      return "";
    }
  }

  handlePreferenceAssignment = pref => {
    // Get the candidates and find the candidate being assigned a preference
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    const candidate = candidates.find(
      c => c.name === localStorage.getItem("chosenCandidate")
    );

    // Set the new preference of the candidate
    const index = candidates.indexOf(candidate);
    candidates[index] = { ...candidate };
    candidates[index].preference = pref;
    // Save the changes to the local storage
    localStorage.setItem("candidates", JSON.stringify(candidates));

    // Show the candidates list
    window.location.href = "/candidates";
  };

  removePreference() {
    //This method executes when the user confirms preference unassignement

    // Retrieve the candidates from local storage and find the candidate to be unassigned the preference
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    var candidateName = localStorage.getItem("chosenCandidate");
    var candidate = candidates.find(c => c.name === candidateName);

    // Set the preference of the candidate to 0 meaning assigned no preference
    const index = candidates.indexOf(candidate);
    candidates[index] = { ...candidate };
    candidates[index].preference = 0;

    // Store the updated candidates in local storage
    localStorage.setItem("candidates", JSON.stringify(candidates));

    // Display the candidates list
    window.location.href = "/candidates";
  }

  render() {
    // Retrieve the chosen candidate from the props
    const candidateChosen = localStorage.getItem("chosenCandidate");
    const header_text = "Choose a preference to assign to " + candidateChosen;
    const preferences = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    if (this.state.display === 0) {
      return (
        <React.Fragment>
          <header>
            <h1 aria-live="assertive"> {header_text}</h1>
          </header>
          <main>
            {this.checkCurrentPreference(candidateChosen)}
            <div>
              {/* Display all the numbers, but hide the preferences that are already assigned */}
              {preferences.map(num => (
                <button
                  key={num}
                  className={this.getStyle(num)}
                  onClick={() => this.handlePreferenceAssignment(num)}
                  aria-hidden={
                    this.getStyle(num) === "number" ? "false" : "true"
                  }
                >
                  {num}
                </button>
              ))}
            </div>
          </main>
          <nav>
            <button
              className="small-btn"
              id="back"
              onClick={() => this.props.history.goBack()}
            >
              <img className="back-icon" src={backicon} alt="Go back" />
            </button>
            {this.displayDeleteBtn(candidateChosen)}
          </nav>
        </React.Fragment>
      );
    } else if (this.state.display === 1) {
      return (
        <Alert
          title="Are you sure you want to delete this preference?"
          btn1="Yes"
          btn1Action={this.removePreference}
          btn2="No"
          btn2Action={() => (window.location.href = "/preferences")}
        />
      );
    }
  }
}

export default Preferences;
