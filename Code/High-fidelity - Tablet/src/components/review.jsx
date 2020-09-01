import React, { Component } from "react";
import Alert from "./alert";
import Footer from "./footer";
import getImage from "../imagelist";
import upicon from "../icons/up.png";
import downicon from "../icons/down.png";
import deleteicon from "../icons/delete-red.png";
import soicon from "../icons/startover-red.png";
import casticon from "../icons/vote.png";

class ReviewVote extends Component {
  state = {
    display: 0,
    deleteId: -1,
    moveUpName1: -1,
    upPref: -1,
    moveDownName1: -1,
    downPref: -1,
    moveUpName2: -1,
    moveDownName2: -1
  };

  getAssignedCandidates() {
    // Retrieve the candidates from local storage and filter out any candidates without a preference assigned
    const candidates = localStorage.getItem("candidates");
    const jsonCandidates = [...JSON.parse(candidates)];
    return jsonCandidates.filter(c => c.preference !== 0);
  }

  getStyle(class_name, partyId) {
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

  confirmDelete(deleteId) {
    this.setState({ deleteId });
    this.setState({ display: 2 });
  }

  deletePreference(deleteId) {
    // Retrieve the candidates from local storage and find the candidate to be unassigned the preference
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    var candidate = candidates.find(c => c.id === deleteId);

    // Set the preference of the candidate to 0 meaning assigned no preference
    const index = candidates.indexOf(candidate);
    candidates[index] = { ...candidate };
    candidates[index].preference = 0;

    // Store the updated candidates in local storage
    localStorage.setItem("candidates", JSON.stringify(candidates));

    // Display the candidates list
    window.location.href = "/review";
  }

  moveDown = (candidateName, candidatePref) => {
    this.setState({ moveDownName1: candidateName });
    this.setState({ downPref: candidatePref });

    // Get the candidate chosen to move down
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];

    // Get the candidate with the next preference
    const candidate2 = candidates.find(c => c.preference === candidatePref + 1);

    //Check if any candidate is assigned the next preference
    if (candidate2 === undefined) {
      //If not ask for confirmation to move up the candidate
      this.setState({ display: 4 });
    } else {
      this.setState({ moveDownName2: candidate2.name });
      this.setState({ display: 6 });
    }
  };

  moveUp = (candidateName, candidatePref) => {
    this.setState({ moveUpName1: candidateName });
    this.setState({ upPref: candidatePref });

    // Get the candidate chosen to move up
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];

    var prevPref = candidatePref - 1;

    // Get the candidate with the previous preference
    const candidate2 = candidates.find(c => c.preference === prevPref);
    //Check if any candidate is assigned the previous preference
    if (candidate2 === undefined) {
      //If not ask for confirmation to move up the candidate
      this.setState({ display: 3 });
    } else {
      this.setState({ moveUpName2: candidate2.name });
      this.setState({ display: 5 });
    }
  };

  moveUpOne = (candidateName, candidatePref) => {
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    const candidate1 = candidates.find(c => c.name === candidateName);
    //Update the candidates array with the candidate's new preference assignment
    const index = candidates.indexOf(candidate1);
    candidates[index] = { ...candidate1 };
    candidates[index].preference = candidatePref - 1;
    //Update the candidate's array in local storage and refrech the page
    localStorage.setItem("candidates", JSON.stringify(candidates));
    window.location.href = "/review";
  };

  moveUpTwo = (candidateName1, candidateName2, candidatePref) => {
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    const candidate1 = candidates.find(c => c.name === candidateName1);
    const candidate2 = candidates.find(c => c.name === candidateName2);

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

  moveDownOne = (candidateName, candidatePref) => {
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    const candidate1 = candidates.find(c => c.name === candidateName);
    //Update the candidates array with the candidate's new preference assignment
    const index = candidates.indexOf(candidate1);
    candidates[index] = { ...candidate1 };
    candidates[index].preference = candidatePref + 1;
    //Update the candidate's array in local storage and refrech the page
    localStorage.setItem("candidates", JSON.stringify(candidates));
    window.location.href = "/review";
  };

  moveDownTwo = (candidateName1, candidateName2, candidatePref) => {
    var candidates = localStorage.getItem("candidates");
    candidates = [...JSON.parse(candidates)];
    const candidate1 = candidates.find(c => c.name === candidateName1);
    const candidate2 = candidates.find(c => c.name === candidateName2);

    //Change the candidates' preferences
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

  startOver() {
    localStorage.removeItem("candidates");
    window.location.href = "/review";
  }

  render() {
    const candidates = this.getAssignedCandidates();
    var text = "";
    var currentPref = 0;
    var name = "";
    var otherName = "";

    // If none of the candidates are assigned a preference, inform the user
    if (this.state.display === 0 && candidates.length === 0) {
      return (
        <React.Fragment>
          <header aria-live="assertive" aria-atomic="true">
            <h1>Review your vote</h1>
            <h2>You have not assigned any preferences yet.</h2>
          </header>
          <main>
            <button
              className="rev-btn"
              id="cast"
              onClick={() => (window.location.href = "/cast")}
            >
              <img className="rev-icon" id="cast-icon" src={casticon} alt="" />
              Cast vote
            </button>
          </main>
          <Footer goBack={() => this.props.history.goBack()} />
        </React.Fragment>
      );
    } else if (this.state.display === 1) {
      return (
        <Alert
          title="Are you sure you want to delete all your assigned preferences?"
          btn1="Yes"
          btn1Action={this.startOver}
          btn2="No"
          btn2Action={() => (window.location.href = "/review")}
        />
      );
    } else if (this.state.display === 2) {
      return (
        <Alert
          title="Are you sure you want to delete this preference?"
          btn1="Yes"
          btn1Action={() => this.deletePreference(this.state.deleteId)}
          btn2="No"
          btn2Action={() => (window.location.href = "/review")}
        />
      );
    } else if (this.state.display === 3) {
      name = this.state.moveUpName1;
      currentPref = this.state.upPref;
      text =
        "Are you sure you want to assign preference number " +
        (currentPref - 1) +
        " to " +
        name +
        "?";
      return (
        <Alert
          title={text}
          btn1="Yes"
          btn1Action={() => this.moveUpOne(name, currentPref)}
          btn2="No"
          btn2Action={() => (window.location.href = "/review")}
        />
      );
    } else if (this.state.display === 4) {
      name = this.state.moveDownName1;
      currentPref = this.state.downPref;
      text =
        "Are you sure you want to assign preference number " +
        (currentPref + 1) +
        " to " +
        name +
        "?";
      return (
        <Alert
          title={text}
          btn1="Yes"
          btn1Action={() => this.moveDownOne(name, currentPref)}
          btn2="No"
          btn2Action={() => (window.location.href = "/review")}
        />
      );
    } else if (this.state.display === 5) {
      name = this.state.moveUpName1;
      otherName = this.state.moveUpName2;
      currentPref = this.state.upPref;
      text =
        "If you confirm this change, " +
        name +
        " will be assigned preference number " +
        (currentPref - 1) +
        " and " +
        otherName +
        " will be assigned preference number " +
        currentPref;
      return (
        <Alert
          title={text}
          btn1="Confirm"
          btn1Action={() => this.moveUpTwo(name, otherName, currentPref)}
          btn2="Cancel"
          btn2Action={() => (window.location.href = "/review")}
        />
      );
    } else if (this.state.display === 6) {
      name = this.state.moveDownName1;
      otherName = this.state.moveDownName2;
      currentPref = this.state.downPref;
      text =
        "If you confirm this change, " +
        name +
        " will be assigned preference number " +
        (currentPref + 1) +
        " and " +
        otherName +
        " will be assigned preference number " +
        currentPref;
      return (
        <Alert
          title={text}
          btn1="Confirm"
          btn1Action={() => this.moveDownTwo(name, otherName, currentPref)}
          btn2="Cancel"
          btn2Action={() => (window.location.href = "/review")}
        />
      );
    }

    return (
      <React.Fragment>
        <header aria-live="assertive">
          <h1>Review your vote</h1>
          <h2>
            The following are the candidates you have assigned preference to in
            ascending order of preference
          </h2>
        </header>
        <main>
          <ol className="candidates-container" id="review-container">
            {candidates
              .sort((a, b) => a.preference - b.preference)
              .map(c => (
                <div className="rev-container" key={c.id}>
                  <li
                    className={this.getStyle(
                      "candidate-box rev-candidate",
                      c.party
                    )}
                  >
                    <div className={this.getStyle("rev-pref", c.party)}>
                      <h4>{c.preference}</h4>
                    </div>
                    <h3 className="rev-name">{c.name}</h3>
                    <img src={getImage(c.id - 1)} alt=" " />
                  </li>

                  <div className="up-down-container">
                    <button
                      className="up-down-btn"
                      style={c.preference > 1 ? {} : { visibility: "hidden" }}
                      onClick={() => this.moveUp(c.name, c.preference)}
                      aria-label="Increase preference"
                    >
                      <img className="up-down-icon" src={upicon} alt="" />
                    </button>

                    <button
                      className="up-down-btn"
                      onClick={() => this.moveDown(c.name, c.preference)}
                      style={{ marginTop: "2vw" }}
                      aria-label="Decrease preference"
                    >
                      <img className="up-down-icon" src={downicon} alt="" />
                    </button>
                  </div>
                  <button
                    className="delete-btn rev-del"
                    onClick={() => this.confirmDelete(c.id)}
                  >
                    <img
                      className="delete-icon rev-del-icon"
                      src={deleteicon}
                      alt="delete"
                    />
                  </button>
                </div>
              ))}
          </ol>

          <button
            className="rev-btn"
            id="cast"
            onClick={() => (window.location.href = "/cast")}
          >
            <img className="rev-icon" id="cast-icon" src={casticon} alt="" />
            Cast vote
          </button>
          <button
            className="rev-btn"
            id="startover"
            onClick={() => this.setState({ display: 1 })}
          >
            <img className="rev-icon" src={soicon} alt="" />
            Start over
          </button>
        </main>
        <Footer goBack={() => this.props.history.goBack()} />
      </React.Fragment>
    );
  }
}

export default ReviewVote;
