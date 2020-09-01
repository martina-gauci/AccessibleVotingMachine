import React, { Component } from "react";
import "./candidateStyles.css";

class Candidate extends Component {
  constructor() {
    super();
    this.state = {
      chosen: true
    };
  }

  render() {
    const route = window.location.pathname;

    if (route === "/review") {
      var class_name = "review-candidate-box";
      if (this.props.party === 1) {
        class_name += " yellow-border";
      } else if (this.props.party === 2) {
        class_name += " pink-border";
      } else if (this.props.party === 3) {
        class_name += " orange-border";
      } else if (this.props.party === 4) {
        class_name += " green-border";
      }

      return (
        <li className={class_name}>
          <div className="candidate-details">
            <h3 className="candidate-name">{this.props.sname}</h3>
            <span className="candidate-info grid">{this.props.fname}</span>
            <span className="candidate-info grid">
              {this.props.adrs}, {this.props.occ}
            </span>
          </div>
          <img
            className="review-candidate-img"
            src={require("../" + this.props.photo)}
            alt=" "
          />
        </li>
      );
    } else {
      //Prepare class name for the chosen candidate
      let btn_class = this.props.selected
        ? "candidate-box chosen"
        : "candidate-box";
      return (
        <button
          onClick={() => this.props.onSelectCandidate(this.props.id)}
          className={btn_class}
        >
          <div className="candidate-details">
            <h3 className="candidate-name">{this.props.sname}</h3>
            <span className="candidate-info">
              {this.props.fname}, {this.props.adrs}, {this.props.occ}
            </span>
          </div>
          <img
            className="candidate-img"
            src={require("../" + this.props.photo)}
            alt=" "
          />
        </button>
      );
    }
  }
}

export default Candidate;
