import React, { Component } from "react";
import { Helmet } from "react-helmet";
import party1icon from "../images/one.png";
import party2icon from "../images/two.png";
import party3icon from "../images/three.png";
import party4icon from "../images/four.png";
import backicon from "../images/back.png";

class Candidates extends Component {
  getFilteredCandidates = partyId => {
    // Retrieve all candidates from local storage and filter them by party
    // The party identifier is passed through the props from component to component
    const candidates = localStorage.getItem("candidates");
    if (partyId === 0) {
      // if the user wants to view all candidates, skip the filterng part
      return JSON.parse(candidates);
    } else {
      const jsonCandidates = [...JSON.parse(candidates)];
      return jsonCandidates.filter(c => c.party === partyId);
    }
  };

  getPartyImage(party) {
    // Return the icon depending on the candidate's party
    if (party === 1) {
      return party1icon;
    }
    if (party === 2) {
      return party2icon;
    }
    if (party === 3) {
      return party3icon;
    }
    if (party === 4) {
      return party4icon;
    }
  }

  getAltText(party) {
    // Return the alt text of the party image
    if (party === 1) {
      return "Party 1 emblem";
    }
    if (party === 2) {
      return "Party 2 emblem";
    }
    if (party === 3) {
      return "Party 3 emblem";
    }
    if (party === 4) {
      return "Party 4 emblem";
    }
  }

  showPreference(preference) {
    // If the candidate is not assigned a preference yet, do not display anything
    if (preference === 0) {
      return "";
    }
    return (
      //If the candidate is assigned a preference, display it next to the candidate
      <div className="preference-box">
        <h4 className="no-margin">{preference}</h4>
      </div>
    );
  }

  goToPreferences(candidateName) {
    localStorage.setItem("chosenCandidate", candidateName);
    window.location.href = "/preferences";
  }

  render() {
    const party_filter = localStorage.getItem("partyFilter");
    const candidates = this.getFilteredCandidates(parseInt(party_filter));
    return (
      <div role="main" aria-labelledby="page-title">
        <Helmet>
          <title>List of candidates</title>
        </Helmet>
        <div className="screen-container">
          {/* Display the correct title depending on wether all candidates are being displayed or those of a specific party */}
          {parseInt(party_filter) === 0 ? (
            <h1 id="page-title">List of all candidates</h1>
          ) : (
            <h1 id="page-title">
              List of candidates from Party {party_filter}
            </h1>
          )}
          <h2>Choose a candidate</h2>
          {/* Display the cnadidates */}
          <ol className="candidates-container">
            {candidates
              .sort((a, b) => a.party - b.party)
              .map(c => (
                <li
                  className="candidate-box"
                  role="button"
                  key={c.id}
                  onClick={() => this.goToPreferences(c.name)}
                >
                  <img
                    className="party-image"
                    src={this.getPartyImage(c.party)}
                    alt={this.getAltText(c.party)}
                  />
                  <h3 className="candidate-name">{c.name}</h3>
                  {/* Show the candidate's assigned preference */}
                  {this.showPreference(c.preference)}
                </li>
              ))}
          </ol>
        </div>

        {/* Navigation Section */}
        <div className="nav-container" role="navigation">
          <button
            className="nav-btn sml"
            onClick={() => (window.location.href = "/filter")}
            aria-label="Go back"
          >
            <img
              className="back-icon"
              src={backicon}
              alt="left pointing arrow"
            />
          </button>
          <button
            className="nav-btn"
            onClick={() => (window.location.href = "/help")}
          >
            Help
          </button>
          <button
            className="nav-btn"
            onClick={() => (window.location.href = "/review")}
          >
            Review Vote
          </button>
          <button
            className="nav-btn"
            onClick={() => (window.location.href = "/castVote")}
          >
            Cast Vote
          </button>
        </div>
      </div>
    );
  }
}

export default Candidates;
