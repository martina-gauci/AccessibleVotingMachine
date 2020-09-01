import React, { Component } from "react";
import { Helmet } from "react-helmet";
import party1icon from "../images/one.png";
import party2icon from "../images/two.png";
import party3icon from "../images/three.png";
import party4icon from "../images/four.png";
import backicon from "../images/back.png";

class ReviewVote extends Component {
  getAssignedCandidates() {
    // Retrieve the candidates from local storage and filter out any candidates without a preference assigned
    const candidates = localStorage.getItem("candidates");
    const jsonCandidates = [...JSON.parse(candidates)];
    return jsonCandidates.filter(c => c.preference !== 0);
  }

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

  render() {
    const candidates = this.getAssignedCandidates();
    // If none of the candidates are assigned a preference, inform the user
    if (candidates.length === 0) {
      return (
        <div role="main" aria-labelledby="page-title">
          <Helmet>
            <title>Review your ballot</title>
          </Helmet>
          <div className="screen-container">
            <h1 id="page-title">Review your ballot</h1>
            <h2>You have not assigned a preference to any candidate</h2>
          </div>

          {/* Navigation Section */}
          <div className="nav-container" role="navigation">
            <button
              className="nav-btn sml"
              onClick={() => this.props.history.goBack()}
              aria-label="Go back"
            >
              <img
                className="back-icon"
                src={backicon}
                alt="leftpointing arrow"
              />
            </button>
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/help")}
            >
              Help
            </button>
            <button className="nav-btn hidden" arie-hidden="true">
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

    // If at least one candidate is assigned a preference, display them in order of preference
    return (
      <div role="main" aria-labelledby="page-title">
        <Helmet>
          <title>Review your vote</title>
        </Helmet>
        <div className="screen-container">
          <h1 id="page-title">Review your ballot</h1>
          <h2>
            The following are the candidates you have assigned preference to in
            ascending order of preference
          </h2>
          <ol className="candidates-container">
            {candidates
              .sort((a, b) => a.preference - b.preference)
              .map(c => (
                <li className="candidate-box" key={c.id}>
                  <img
                    className="party-image"
                    src={this.getPartyImage(c.party)}
                    alt={this.getAltText(c.party)}
                  />
                  <h3 className="candidate-name">{c.name}</h3>
                  <div className="preference-box">
                    <h4 className="no-margin">{c.preference}</h4>
                  </div>
                </li>
              ))}
          </ol>
          <div className="attention-box">
            <i>
              If you would like to change your vote you can do so from the
              ballot
            </i>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="nav-container" role="navigation">
          <button
            className="nav-btn sml"
            onClick={() => this.props.history.goBack()}
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
          <button className="nav-btn hidden" aria-hidden="true">
            Review
          </button>
          <button
            className="nav-btn"
            onClick={() => (window.location.href = "/castVote")}
          >
            Cast vote
          </button>
        </div>
      </div>
    );
  }
}

export default ReviewVote;
