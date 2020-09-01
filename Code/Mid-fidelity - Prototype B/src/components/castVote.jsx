import React, { Component } from "react";
import { Helmet } from "react-helmet";
import backicon from "../images/back.png";

class CastVote extends Component {
  // Use the state variable as a flag which reflects whether the vote has been cast or not
  // The content displayed depends on this
  state = {
    voteCast: false
  };

  isVoteValid() {
    // Check if the vote is valid (the preferences are assigned in a sequence from 1 upwards)
    // Returns true if the vote is valid, false otherwise
    const candidates = localStorage.getItem("candidates");
    var preferences = JSON.parse(candidates)
      .sort((a, b) => a.preference - b.preference)
      .map(c => c.preference);
    var unique = [...new Set(preferences)];
    console.log(unique);

    if (unique.length === 1 && unique[0] === 0) {
      return 0;
    }

    //if all candidates are assigned a preference
    if (unique.length === 15 && unique[0] === 1) {
      return 0;
    }

    if (unique[0] !== 0) {
      return 1;
    }
    for (var i = 1; i < unique.length; i++) {
      console.log("i", i);
      if (unique[i] - unique[i - 1] !== 1) {
        return unique[i - 1] + 1;
      }
    }

    return 0;
  }

  castTheVote() {
    // When the vote is cast, clear local storage and set the state flag variable to true
    localStorage.removeItem("candidates");
    this.setState({ voteCast: true });
  }

  displayMessage() {
    var valid = this.isVoteValid();
    // If the vote is valid, inform the user and allow the vote to be cast
    if (valid === 0) {
      return (
        <div>
          <h1 id="page-title">Your vote is valid.</h1>
          <h2>Press 'Cast Vote' to officially cast your vote</h2>
          <div className="attention-box">
            <i>This action is irreversable.</i>
            <br></br>
            <i>
              Please make sure you are casting your intended vote by reviewing
              your vote.
            </i>
          </div>
          <button className="cast-btn" onClick={() => this.castTheVote()}>
            Cast Vote
          </button>
        </div>
      );
    }
    // If the vote is invalid, inform the user that the vote cannot be cast
    else {
      const msg =
        "Please assign preference number " + valid + " to validate your vote";
      return (
        <div>
          <h1 id="page-title">Your vote is invalid</h1>
          <h2>{msg}</h2>
        </div>
      );
    }
  }

  render() {
    if (this.state.voteCast) {
      // If the vote has already been cast, display an appropriate message
      return (
        <div
          className="screen-container"
          role="main"
          aria-labelledby="page-title"
        >
          <Helmet>
            <title>Vote cast</title>
          </Helmet>
          <h1 id="page-title">You have submitted your vote</h1>
          <h2>You can now leave the polling booth</h2>
        </div>
      );
    } else {
      return (
        <div
          className="screen-container"
          role="main"
          aria-labelledby="page-title"
        >
          <Helmet>
            <title>Cast your vote</title>
          </Helmet>
          {/* Display the appropriate message depending on wether the vote is valid or not */}
          {this.displayMessage()}

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
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/review")}
            >
              Review Vote
            </button>
            <button className="nav-btn hidden" aria-hidden="true">
              Cast Vote
            </button>
          </div>
        </div>
      );
    }
  }
}

export default CastVote;
