import React, { Component } from "react";
import getImage from "../imagelist";

class Candidate extends Component {
  goToPreferences(candidateName) {
    localStorage.setItem("chosenCandidate", candidateName);
    window.location.href = "/preferences";
  }

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

  loadImg() {
    console.log(getImage(1));
    return <img className="candidate-img" src="" alt=" " />;
  }

  render() {
    const img = localStorage.getItem("Williams James");
    return (
      <li
        className="candidate-box"
        role="button"
        onClick={() => this.goToPreferences(this.props.fullname)}
      >
        <h3>{this.props.fullname}</h3>
        {/* {this.loadImg()} */}
        <img className="candidate-img" src={getImage(this.props.id)} alt=" " />
        {/* Show the candidate's assigned preference */}
        {this.showPreference(this.props.pref)}
      </li>
    );
  }
}

export default Candidate;
