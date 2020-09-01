import React, { Component } from "react";
import Candidate from "./candidate";
import "./candidatesStyles.css";
import { Helmet } from "react-helmet";
import helpicon from "../icons/help.png";

class Candidates extends Component {
  checkCandidates(partyNum) {
    //Get candidates that are not yet assigned a preference
    const candidatesWithoutPreference = this.props.listOfCandidates.filter(
      c => c.preference === 0
    );
    //Keep only candidates in the specific party
    const partyCandidates = candidatesWithoutPreference.filter(
      c => c.party === partyNum
    );
    //Prepare the class name for the party
    let partyStyle = "party-colour-" + partyNum;

    //If the party's candidates are all assigned a preference display a message to inform the user
    if (partyCandidates.length === 0) {
      return (
        <div className={"party-box " + partyStyle}>
          <h2 className={"party-title " + partyStyle}>Party {partyNum}</h2>
          <h3 className="no-candidate-message">
            All candidates of this party have been assigned a preference
          </h3>
        </div>
      );
    }
    //If one or more candidates from the party have not been assigned a preference, display them
    return (
      <div className={"party-box " + partyStyle}>
        <h2 className={"party-title " + partyStyle}>Party {partyNum}</h2>
        <ol>
          {/*Pass all the necessary information to the candidate component 
          Which is rendered for each candidate not assigned a preference */}
          {partyCandidates.map(c => (
            <li key={c.id} className="no-margin">
              <Candidate
                // key={c.id}
                id={c.id}
                sname={c.surname}
                fname={c.fullname}
                adrs={c.address}
                occ={c.occupation}
                photo={c.image}
                selected={
                  this.props.selectedCandidateId === c.id ? true : false
                }
                onSelectCandidate={this.props.onSelectCandidate}
              />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  render() {
    return (
      <div role="main" aria-labelledby="title">
        <Helmet>
          <title>Candidates List</title>
        </Helmet>
        <div className="page-title" id="title">
          <h1>Assign preference number {this.props.preference}</h1>
          <button
            className="help-btn"
            onClick={() => (window.location.href = "/help")}
          >
            <img className="btn-icon img-width" alt="help" src={helpicon} />
          </button>
        </div>
        <div className="candidates-container">
          {this.checkCandidates(1)} {/*Display candidates of Party 1*/}
          {this.checkCandidates(2)} {/*Display candidates of Party 2*/}
          {this.checkCandidates(3)} {/*Display candidates of Party 3*/}
          {this.checkCandidates(4)} {/*Display candidates of Party 4*/}
        </div>
      </div>
    );
  }
}

export default Candidates;
