import React, { Component } from "react";
import "./navigationStyles.css";
import backicon from "../icons/left-arrow.png";
import nexticon from "../icons/right-arrow.png";
import noicon from "../icons/no.png";
import yesicon from "../icons/yes.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class Navigation extends Component {
  proceedWithReset = () => {
    localStorage.clear();
    window.location.reload();
    window.scrollTo(0, 0);
  };
  resetPreferences = () => {
    //Confirm that the user wants to remove all assigned preference and start over
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
              onClick={this.proceedWithReset}
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

  goBack = () => {
    //Confirm that the user wants to undo his previous assignment
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-alert" role="alert">
            <h1>Are you sure you want to go back?</h1>
            <p>This action will delete the previous preference assignment.</p>
            <button
              className="confirm-btn green-background"
              onClick={() => {
                this.removeLastAssignment();
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

  removeLastAssignment = () => {
    // Get the last preference number assigned which is the one before the one being ased for at the moment
    const lastAsignment = this.props.preference - 1;
    // Get candidates array from local storage and retreive the candidate with the preference assignment
    const candidates = JSON.parse(localStorage.getItem("candidates"));
    const candidate = candidates.find(c => c.preference === lastAsignment);
    const index = candidates.indexOf(candidate);
    candidates[index] = { ...candidate };
    //Set the candidates preference to 0 .: no preference has been assigned
    candidates[index].preference = 0;
    // this.setState({ candidates });

    //Store the updated candidates and the next preference to ask for in local storage
    localStorage.setItem("candidates", JSON.stringify(candidates));
    localStorage.setItem("preference", localStorage.getItem("candidates") - 1);
    window.location.reload();
    window.scrollTo(0, 0);
  };

  render() {
    let backVisibility = this.props.preference !== 1 ? "inherit" : "hidden";
    let nextVisibility = this.props.preference !== 16 ? "inherit" : "hidden";
    return (
      <div className="nav-bar" role="navigation">
        <button
          className="nav-btn"
          onClick={this.goBack}
          style={{ visibility: backVisibility }}
          aria-hidden={this.props.preference !== 1 ? "false" : "true"}
        >
          <img className="btn-icon" src={backicon} alt=" " />
          Back
        </button>

        <button
          onClick={this.props.assignPreference}
          className="nav-btn"
          style={{ visibility: nextVisibility }}
          aria-hidden={this.props.preference !== 16 ? "false" : "true"}
        >
          Next
          <img className="btn-icon" src={nexticon} alt=" " />
        </button>

        <button
          className="nav-btn lrg"
          onClick={() => (window.location.href = "/review")}
        >
          Review Your Provisional Vote
        </button>

        <button
          onClick={this.resetPreferences}
          className="nav-btn lrg"
          style={{ visibility: backVisibility }}
          aria-hidden={this.props.preference !== 1 ? "false" : "true"}
        >
          Start Over
        </button>
      </div>
    );
  }
}

export default Navigation;
