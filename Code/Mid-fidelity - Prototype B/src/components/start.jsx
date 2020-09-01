import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

class Start extends Component {
  // This component is displayed when the web app is launched
  // It shows two buttons, one to go to the help page and another to go to the filter page
  render() {
    return (
      <div
        className="start-screen-container"
        role="main"
        aria-labelledby="page-title"
      >
        <Helmet>
          <title>Start page</title>
        </Helmet>
        <h1 id="page-title">Election for members of European Parliament</h1>
        <button
          className="button"
          onClick={() => (window.location.href = "/help")}
        >
          How to cast your vote
        </button>
        <button
          className="button"
          onClick={() => (window.location.href = "/filter")}
        >
          Start voting
        </button>
      </div>
    );
  }
}

export default withRouter(Start);
