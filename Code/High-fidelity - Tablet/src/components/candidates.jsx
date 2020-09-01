import React, { Component } from "react";
import Footer from "./footer";
import Candidate from "./candidate";

class Candidates extends Component {
  showPartyCandidates(partyId, party_style) {
    const candidates = this.getFilteredCandidates(partyId);
    return (
      <React.Fragment>
        <h2 className={party_style}>Party {partyId}</h2>
        <ol className={party_style}>
          {candidates
            .sort((a, b) => a.party - b.party)
            .map(c => (
              <Candidate
                key={c.id}
                fullname={c.name}
                id={c.id - 1}
                pref={c.preference}
              />
            ))}
        </ol>
      </React.Fragment>
    );
  }

  renderCandidates() {
    var party_id = localStorage.getItem("partyFilter");
    party_id = parseInt(party_id);
    if (party_id === 1) {
      return this.showPartyCandidates(1, "yellow-background");
    } else if (party_id === 2) {
      return this.showPartyCandidates(2, "pink-background");
    } else if (party_id === 3) {
      return this.showPartyCandidates(3, "orange-background");
    } else if (party_id === 4) {
      return this.showPartyCandidates(4, "green-background");
    }

    return (
      <React.Fragment>
        {this.showPartyCandidates(1, "yellow-background")}
        {this.showPartyCandidates(2, "pink-background")}
        {this.showPartyCandidates(3, "orange-background")}
        {this.showPartyCandidates(4, "green-background")}
      </React.Fragment>
    );
  }

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

  showPreference(preference) {
    // If the candidate is not assigned a preference yet, do not display anything
    if (preference === 0) {
      return "";
    }
    return (
      //If the candidate is assigned a preference, display it next to the candidate
      <div className="preference-box">
        <h4>{preference}</h4>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <header aria-live="assertive">
          <h1>List of candidates</h1>
          <h2>Choose a candidate</h2>
        </header>
        <main className="candidates-container">{this.renderCandidates()}</main>
        <Footer goBack={() => (window.location.href = "/")} />
      </React.Fragment>
    );
  }
}

export default Candidates;
