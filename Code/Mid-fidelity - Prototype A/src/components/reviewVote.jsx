import React, { Component } from "react";
import Candidate from "./candidate";
import "./reviewVoteStyles.css";
import deleteicon from "../icons/delete.png";
import upicon from "../icons/up.png";
import downicon from "../icons/down.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Helmet } from "react-helmet";
import helpicon from "../icons/help.png";
import noicon from "../icons/no.png";
import yesicon from "../icons/yes.png";

class ReviewVote extends Component {
  state = {
    deleteId: -1,
    moveUpFirst: -1,
    moveUpSecond: -1,
    moveDownFirst: -1,
    moveDownSecond: -1,
    voteCast: false // this property is changed to true when the vote is cast so that the user is displayed with a confirmation message
  };

  castVote = () => {
    //Retreive the candidates from local storage and the preferences that have been asigned
    const candidates = localStorage.getItem("candidates");
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
        //If a missing number is found in the sequence, store it
        next = unique[i - 1] + 1;
        break;
      }
    }

    //Check if any missing number in the sequence was found
    if (next === 0) {
      //If not, proceed to confirm that the user wants to cast the vote
      this.confirmCastVote();
    } else {
      //Otherwise, inform the user that his vote is invalid and why
      this.invalidVote(next);
    }
  };

  finishHim = () => {
    localStorage.clear();
    this.setState({ voteCast: true });
  };

  confirmCastVote() {
    //Ask the user for confirmation
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-alert" role="alert">
            <h1>Are you sure you want to cast your vote?</h1>
            <p>This action cannot be undone.</p>
            <button
              className="confirm-btn green-background"
              onClick={this.finishHim}
            >
              <img className="confirm-icon" alt=" " src={yesicon} />
              Yes
            </button>
            <button className="confirm-btn red-background" onClick={onClose}>
              <img className="confirm-icon" alt=" " src={noicon} />
              No
            </button>
          </div>
        );
      }
    });
  }

  invalidVote(pref) {
    //Inform the user that his vote is invalid and therefore cannot be cast
    //The reason for the vote being invalid is also displayed
    var msg1 = "Your vote cannot be cast as it is invalid.";
    var msg2 =
      "Please assign preference number " + pref + " before casting your vote.";
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-alert" role="alert">
            <h1>Invalid Vote</h1>
            <p id="no-padding">{msg1}</p>
            <p id="no-padding">{msg2}</p>
            <button className="confirm-btn" onClick={onClose}>
              OK
            </button>
          </div>
        );
      }
    });
  }

  actualDeletePref = () => {
    //Retrieve the candidate that was chosen to be unassigned from his preference
    const candidates = [...this.state.candidates];
    const candidateId = this.state.deleteId;
    const candidate = candidates.find(c => c.id === candidateId);

    //Set the candidate's preference to 0 meaning the candidate is not assigned a preference
    const index = candidates.indexOf(candidate);
    candidates[index] = { ...candidate };
    candidates[index].preference = 0;
    this.setState({ candidates });
    //Store updated candidates array in local storage and refresh the page
    localStorage.setItem("candidates", JSON.stringify(candidates));
    window.location.reload();
  };

  deletePreference = candidateId => {
    //Retrieve the candidate that was chosen to be unassigned from his preference
    const candidates = [...this.state.candidates];
    const candidate = candidates.find(c => c.id === candidateId);
    this.setState({ deleteId: candidateId });
    console.log(this.state.deleteId);
    //Ask user for confirmation
    var title =
      "Are you sure you want to unassign " +
      candidate.fullname +
      " from their preference?";
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-alert" role="alert">
            <h1>{title}</h1>
            <button
              className="confirm-btn green-background"
              onClick={this.actualDeletePref}
            >
              <img className="confirm-icon" alt=" " src={yesicon} />
              Yes
            </button>
            <button className="confirm-btn red-background" onClick={onClose}>
              <img className="confirm-icon" alt=" " src={noicon} />
              No
            </button>
          </div>
        );
      }
    });
  };

  confirmReset = () => {
    //Ask user of confirmation of deleting all preferences
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-alert" role="alert">
            <h1>Are you sure you want to start over?</h1>
            <p>
              This action will delete all the previous preference assignments.
              You will have to start over from the first preference.
            </p>
            <button
              className="confirm-btn green-background"
              onClick={() => {
                //If the user confirms, clear local storage and refresh the page
                localStorage.clear();
                window.location.reload();
              }}
            >
              <img className="confirm-icon" alt=" " src={yesicon} />
              Yes
            </button>
            <button className="confirm-btn red-background" onClick={onClose}>
              <img className="confirm-icon" alt=" " src={noicon} />
              No
            </button>
          </div>
        );
      }
    });
  };

  componentDidMount() {
    const candidates = localStorage.getItem("candidates");
    this.setState({ candidates: JSON.parse(candidates) });
  }

  moveUpOne = () => {
    // Get the candidate chosen to move up
    const candidates = [...this.state.candidates];
    const candidateId = this.state.moveUpFirst;
    const candidate1 = candidates.find(c => c.id === candidateId);
    const candidatePref = candidate1.preference;
    //Update the candidates array with the candidate's new preference assignment
    const index = candidates.indexOf(candidate1);
    candidates[index] = { ...candidate1 };
    candidates[index].preference = candidatePref - 1;
    this.setState({ candidates });
    //Update the candidate's array in local storage and refrech the page
    localStorage.setItem("candidates", JSON.stringify(candidates));
    window.location.reload();
  };

  moveUpTwo = () => {
    // Get the candidate chosen to move up
    const candidates = [...this.state.candidates];
    const candidateId1 = this.state.moveUpFirst;
    const candidate1 = candidates.find(c => c.id === candidateId1);
    const candidate2 = this.state.moveUpSecond;
    const candidatePref = candidate1.preference;

    //Change the candidates' preferences
    const index1 = candidates.indexOf(candidate1);
    const index2 = candidates.indexOf(candidate2);
    candidates[index1] = { ...candidate1 };
    candidates[index2] = { ...candidate2 };
    candidates[index1].preference = candidatePref - 1;
    candidates[index2].preference = candidatePref;
    this.setState({ candidates });
    //Update the candidates array in local storage and refresh the page
    localStorage.setItem("candidates", JSON.stringify(candidates));
    window.location.reload();
  };

  moveDownOne = () => {
    // Get the candidate chosen to move up
    const candidates = [...this.state.candidates];
    const candidateId = this.state.moveDownFirst;
    const candidate1 = candidates.find(c => c.id === candidateId);
    const candidatePref = candidate1.preference;

    //Update the candidates array with the candidate's new preference assignment
    const index = candidates.indexOf(candidate1);
    candidates[index] = { ...candidate1 };
    candidates[index].preference = candidatePref + 1;
    this.setState({ candidates });
    //Update the candidate's array in local storage and refrech the page
    localStorage.setItem("candidates", JSON.stringify(candidates));
    window.location.reload();
  };

  moveDownTwo = () => {
    console.log(this.state.moveDownFirst);
    console.log(this.state.moveDownSecond);

    // Get the candidate chosen to move up
    const candidates = [...this.state.candidates];
    const candidateId1 = this.state.moveDownFirst;
    const candidate1 = candidates.find(c => c.id === candidateId1);
    const candidate2 = this.state.moveDownSecond;
    const candidatePref = candidate1.preference;
    const index1 = candidates.indexOf(candidate1);
    const index2 = candidates.indexOf(candidate2);
    candidates[index1] = { ...candidate1 };
    candidates[index2] = { ...candidate2 };
    candidates[index1].preference = candidatePref + 1;
    candidates[index2].preference = candidatePref;
    this.setState({ candidates });
    //Update the candidates array in local storage and refresh the page
    localStorage.setItem("candidates", JSON.stringify(candidates));
    window.location.reload();
  };

  moveUp = (candidateId, candidatePref) => {
    // Get the candidate chosen to move up
    const candidates = [...this.state.candidates];
    const candidate1 = candidates.find(c => c.id === candidateId);
    this.setState({ moveUpFirst: candidateId });

    // Get the candidate with the previous preference
    const candidate2 = candidates.find(c => c.preference === candidatePref - 1);

    //Check if any candidate is assigned the previous preference
    if (candidate2 === undefined) {
      //If not ask for confirmation to move up the candidate
      var title1 =
        "Are you sure you want to assign preference number " +
        (candidatePref - 1) +
        " to " +
        candidate1.fullname +
        "?";
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="confirm-alert" role="alert">
              <h1>{title1}</h1>
              <button
                className="confirm-btn green-background"
                onClick={this.moveUpOne}
              >
                <img className="confirm-icon" alt=" " src={yesicon} />
                Yes
              </button>
              <button className="confirm-btn red-background" onClick={onClose}>
                <img className="confirm-icon" alt=" " src={noicon} />
                No
              </button>
            </div>
          );
        }
      });
    } else {
      this.setState({ moveUpSecond: candidate2 });
      // If so, ask for confirmation of switching preferences
      var title2 =
        "Are you sure you want to assign preference number " +
        (candidatePref - 1) +
        " to " +
        candidate1.fullname +
        "?";
      var message =
        "This will also assign preference number " +
        candidatePref +
        " to " +
        candidate2.fullname;

      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="confirm-alert" role="alert">
              <h1>{title2}</h1>
              <p>{message}</p>
              <button
                className="confirm-btn green-background"
                onClick={this.moveUpTwo}
              >
                <img className="confirm-icon" alt=" " src={yesicon} />
                Yes
              </button>
              <button className="confirm-btn red-background" onClick={onClose}>
                <img className="confirm-icon" alt=" " src={noicon} />
                No
              </button>
            </div>
          );
        }
      });
    }
  };

  moveDown = (candidateId, candidatePref) => {
    // Get the candidate chosen to move down
    const candidates = [...this.state.candidates];
    const candidate1 = candidates.find(c => c.id === candidateId);
    this.setState({ moveDownFirst: candidateId });

    // Get the candidate with the next preference
    const candidate2 = candidates.find(c => c.preference === candidatePref + 1);

    //Check if any candidate is assigned the next preference
    if (candidate2 === undefined) {
      //If not ask for confirmation to move down the candidate
      var title =
        "Are you sure you want to assign preference number " +
        (candidatePref + 1) +
        " to " +
        candidate1.fullname +
        "?";
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="confirm-alert" role="alert">
              <h1>{title}</h1>
              <button
                className="confirm-btn green-background"
                onClick={this.moveDownOne}
              >
                <img className="confirm-icon" alt=" " src={yesicon} />
                Yes
              </button>
              <button className="confirm-btn red-background" onClick={onClose}>
                <img className="confirm-icon" alt=" " src={noicon} />
                No
              </button>
            </div>
          );
        }
      });
    } else {
      this.setState({ moveDownSecond: candidate2 });
      // If so, ask for confirmation of switching preferences
      var title2 =
        "Are you sure you want to assign preference number " +
        (candidatePref + 1) +
        " to " +
        candidate1.fullname +
        "?";
      var message =
        "This will also assign preference number " +
        candidatePref +
        " to " +
        candidate2.fullname;
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="confirm-alert" role="alert">
              <h1>{title2}</h1>
              <p>{message}</p>
              <button
                className="confirm-btn green-background"
                onClick={this.moveDownTwo}
              >
                <img className="confirm-icon" alt=" " src={yesicon} />
                Yes
              </button>
              <button className="confirm-btn red-background" onClick={onClose}>
                <img className="confirm-icon" alt=" " src={noicon} />
                No
              </button>
            </div>
          );
        }
      });
    }
  };

  getBorder(partyId) {
    var class_name = "preference-box";

    if (partyId === 1) {
      class_name += " yellow-border";
    } else if (partyId === 2) {
      class_name += " pink-border";
    } else if (partyId === 3) {
      class_name += " orange-border";
    } else if (partyId === 4) {
      class_name += " green-border";
    }
    return class_name;
  }

  render() {
    //Retreive all candidates which are assigned a preference
    const assignedCandidates = this.props.allCandidates.filter(
      c => c.preference !== 0
    );

    // If the user has cast his vote, display an appropriate message
    if (this.state.voteCast === true) {
      return (
        <div role="main" aria-labelledby="page-title">
          <Helmet>
            <title>Vote Cast</title>
          </Helmet>
          <h1 id="page-title">Your vote has been cast successfully</h1>
          <p>You can now leave the polling booth</p>
        </div>
      );
    }

    // If no candidates have been assigned a preference,
    //inform the user that he must go to the ballot page and assign preferences there
    if (assignedCandidates.length === 0) {
      return (
        <div>
          <Helmet>
            <title>Review your ballot</title>
          </Helmet>
          <div className="page-title">
            <h1>Review your ballot</h1>
            <button
              className="help-btn"
              onClick={() => (window.location.href = "/help")}
            >
              <img className="btn-icon img-width" alt="help" src={helpicon} />
            </button>
          </div>
          <h2 role="main" aria-labelledby="title">
            Your vote is currently empty. You have not assigned any preferences
            yet. Go back to ballot to allocate your preferences.
          </h2>
          <div className="nav-bar" role="navigation">
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/")}
            >
              Back to candidates list
            </button>
            <button onClick={this.castVote} className="nav-btn">
              Cast Vote
            </button>
          </div>
        </div>
      );
    }

    // Find the largest assigned preference so that the last candidate will not have a down arrow
    // var lastCandidate = assignedCandidates[assignedCandidates.length - 1];
    // const largestPref = lastCandidate.preference;

    //If one or more candidiates have been assigned a preference,
    //display them next to their preference in a sorted list
    return (
      <div>
        <Helmet>
          <title>Review your ballot</title>
        </Helmet>
        <div className="page-title">
          <h1>Review your ballot</h1>
          <button
            className="help-btn"
            onClick={() => (window.location.href = "/help")}
          >
            <img className="btn-icon img-width" alt="help" src={helpicon} />
          </button>
        </div>
        <h2>
          The following list contains the candidates you have assigned a
          preference to in ascending order of preference
        </h2>
        <ol role="main" aria-labelledby="title">
          {assignedCandidates
            .sort((a, b) => a.preference - b.preference)
            .map(c => (
              <div className="candidate-container" key={c.id}>
                {/* Pass all the necessary information to the candidate component 
                Which is rendered for each candidate not assigned a preference */}
                <Candidate
                  key={c.id}
                  id={c.id}
                  sname={c.surname}
                  fname={c.fullname}
                  adrs={c.address}
                  occ={c.occupation}
                  photo={c.image}
                  party={c.party}
                />
                <div className={this.getBorder(c.party)}>
                  <h4 className="preference-num">{c.preference}</h4>
                </div>
                <div className="up-down-container">
                  {/* The first preference will not have an up button */}
                  <button
                    className="up-down-btn"
                    style={c.preference > 1 ? {} : { visibility: "hidden" }}
                    onClick={() => this.moveUp(c.id, c.preference)}
                    aria-label="Increase preference"
                  >
                    <img className="up-down-icon" src={upicon} alt="move up" />
                  </button>

                  {/* The last preference will not have a down button */}
                  <button
                    className="up-down-btn"
                    onClick={() => this.moveDown(c.id, c.preference)}
                    style={
                      c.preference !== assignedCandidates.length
                        ? {}
                        : { visibility: "hidden" }
                    }
                    aria-label="Decrease preference"
                  >
                    <img
                      className="up-down-icon"
                      src={downicon}
                      alt="move down"
                    />
                  </button>
                </div>
                <button
                  onClick={() => this.deletePreference(c.id)}
                  className="delete-btn"
                  aria-label="Delete preference"
                >
                  <img className="delete-icon" src={deleteicon} alt="cross" />
                </button>
              </div>
            ))}
        </ol>

        <div className="nav-bar" role="navigation">
          <button
            className="nav-btn-rev"
            onClick={() => (window.location.href = "/")}
          >
            Back to candidates list
          </button>
          <button onClick={this.castVote} className="nav-btn-rev">
            Cast Vote
          </button>
          <button onClick={this.confirmReset} className="nav-btn-rev lrg-rev">
            Start Over
          </button>
        </div>
      </div>
    );
  }
}

export default ReviewVote;
