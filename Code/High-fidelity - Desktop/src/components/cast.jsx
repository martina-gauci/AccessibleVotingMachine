import React, { Component } from "react";
import Alert from "./alert";
import Footer from "./footer";
// import casticon from "../icons/vote.png";

class CastVote extends Component {
  displayCommentBtn() {
    // Retrieve the candidates from local storage and filter out any candidates without a preference assigned
    const candidates = localStorage.getItem("candidates");
    var jsonCandidates = [...JSON.parse(candidates)];
    jsonCandidates = jsonCandidates.filter(c => c.preference !== 0);
    if (jsonCandidates.length === 0) {
      return (
        <button onClick={() => (window.location.href = "/submitComment")}>
          Add a comment
        </button>
      );
    }
    return "";
  }

  goToSubmitComment = () => {
    console.log("go to submit comment");
    window.location.href = "/submitComment";
  };

  isVoteValid() {
    // Check if the vote is valid (the preferences are assigned in a sequence from 1 upwards)
    // Returns true if the vote is valid, false otherwise
    const candidates = localStorage.getItem("candidates");
    var preferences = JSON.parse(candidates)
      .sort((a, b) => a.preference - b.preference)
      .map(c => c.preference);
    var unique = [...new Set(preferences)];
    // console.log(unique);

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
      // console.log("i", i);
      if (unique[i] - unique[i - 1] !== 1) {
        return unique[i - 1] + 1;
      }
    }

    return 0;
  }

  goToReview() {
    window.location.href = "/review";
  }

  goToFinish() {
    window.location.href = "/finish";
  }

  goToFilter() {
    window.location.href = "/";
  }

  render() {
    var valid = this.isVoteValid();

    if (valid === 0) {
      return (
        <Alert
          title="Are you sure you want to cast your vote? This action is irreversible."
          btn1="Yes"
          btn1Action={this.goToFinish}
          btn2="No"
          btn2Action={() => this.props.history.goBack()}
        />
      );
    } else {
      var msg =
        "Please assign preference number " +
        valid +
        " before casting your vote.";
      return (
        <React.Fragment>
          <header>
            <h1 aria-live="assertive">Your vote is invalid.</h1>
            <h2 aria-live="assertive">{msg}</h2>
          </header>
          <main>
            <button
              className="invalid-vote-btn"
              onClick={() => (window.location.href = "/")}
            >
              View candidates
            </button>
          </main>
          <Footer goBack={() => this.props.history.goBack()} />
        </React.Fragment>
      );
    }
  }
}

export default CastVote;
