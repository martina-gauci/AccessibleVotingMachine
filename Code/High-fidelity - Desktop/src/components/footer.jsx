import React, { Component } from "react";
import backicon from "../icons/back.png";
import helpicon from "../icons/help.png";
import casticon from "../icons/vote-black.png";

class Footer extends Component {
  getHelpStyle() {
    var path = window.location.pathname;
    if (path === "/help") {
      return "small-btn hidden";
    } else {
      return "small-btn";
    }
  }

  getBackStyle() {
    var path = window.location.pathname;
    if (path === "/") {
      return "small-btn hidden";
    } else {
      return "small-btn";
    }
  }

  getRevStyle() {
    var path = window.location.pathname;
    if (path === "/review") {
      return "lrg-btn hidden";
    } else if (path === "/submitComment") {
      return "lrg-btn hidden";
    } else {
      return "lrg-btn";
    }
  }

  render() {
    return (
      <nav>
        <button
          className={this.getBackStyle()}
          id="back"
          onClick={this.props.goBack}
        >
          <img className="back-icon" src={backicon} alt="Go back" />
        </button>
        <button
          className={this.getHelpStyle()}
          id="help"
          onClick={() => (window.location.href = "/help")}
        >
          <img className="back-icon" src={helpicon} alt="help" />
        </button>
        <button
          className={this.getRevStyle()}
          id="nav-review"
          onClick={() => (window.location.href = "/review")}
        >
          <img className="delete-icon" src={casticon} alt=" " />
          Review and cast your vote
        </button>
      </nav>
    );
  }
}

export default Footer;
