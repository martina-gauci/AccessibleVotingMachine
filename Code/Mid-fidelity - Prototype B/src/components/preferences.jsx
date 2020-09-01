import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import backicon from "../images/back.png";
import deleteicon from "../images/delete.png";

class Preferences extends Component {
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

  checkForPreference(candidateName) {
    // Retrieve the candidate for local storage
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    // Find the candidate and return his preference
    var candidate = candidates.find(c => c.name === candidateName);
    return candidate.preference;
  }

  showAlert(candidateName, candidatePreference) {
    // If the candidate is already assigned a preference,
    // Inform the user with the current preference assigned and the possible options

    var message1 =
      candidateName +
      " is already assign preference number " +
      candidatePreference;
    var message2 =
      "If you do not wish to change this preference tap on the back button at the bottom of the page";
    var message3 =
      "If you only wish to unassign " +
      candidateName +
      " from their current preference tap the delete preference button at the bottom of the page";

    return (
      <div className="alert">
        <p>{message1}</p>
        <p>{message2}</p>
        <p>{message3}</p>
      </div>
    );
  }

  confirmRemoval = candidateName => {
    // When the user taps the 'Delete Preference' button, ask the user to confirm the deletion

    var message =
      candidateName + " will be assigned no preference if you confirm.";
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="popup-alert" role="alert">
            <h1>Are you sure you want to remove this preference?</h1>
            <p>{message}</p>
            <button
              onClick={() => {
                this.removePreference(candidateName);
              }}
              className="nav-btn"
            >
              Yes
            </button>
            <button className="nav-btn" onClick={onClose}>
              No
            </button>
          </div>
        );
      }
    });
  };

  removePreference(candidateName) {
    //This method executes when the user confirms preference unassignement

    // Retrieve the candidates from local storage and find the candidate to be unassigned the preference
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
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
    const header = "Choose a preference to assign to " + candidateChosen;
    const preferences = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    // Get the preference the candidate is currently assigned
    const candidatePref = this.checkForPreference(candidateChosen);
    return (
      <div role="main" aria-labelledby="page-title">
        <Helmet>
          <title>List of available preferences</title>
        </Helmet>
        <div className="screen-container">
          <h1 id="page-title">{header}</h1>
          {/* If the candidate is already assigned a preference, inform the user */}
          {/* Otherwise skip the alert display */}
          {candidatePref > 0
            ? this.showAlert(candidateChosen, candidatePref)
            : ""}
          <div className="preferences-container">
            {/* Display all the numbers, but hide the preferences that are already assigned */}
            {preferences.map(num => (
              <button
                className={this.getStyle(num)}
                key={num}
                onClick={() => this.handlePreferenceAssignment(num)}
                aria-hidden={this.getStyle(num) === "number" ? "false" : "true"}
              >
                <h2>{num}</h2>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="nav-container" role="navigation">
          <button
            className="nav-btn sml"
            onClick={() => (window.location.href = "/candidates")}
            aria-label="Go back"
          >
            <img
              className="back-icon"
              src={backicon}
              alt="left pointing arrow"
            />
          </button>
          {/* If the candidate is already assigned a preference, show a button that allows the user to unassign the preference */}
          {candidatePref > 0 ? (
            <button
              className="nav-btn del"
              onClick={() => this.confirmRemoval(candidateChosen)}
            >
              <img className="delete-icon" alt="" src={deleteicon} />
              Delete preference
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Preferences;
