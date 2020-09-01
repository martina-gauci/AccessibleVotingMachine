import React, { Component } from "react";
import { Helmet } from "react-helmet";

class Filter extends Component {
  goToCandidates = x => {
    // redirect to the list of candidates, passing along the party chosen from the filter
    // the party identifier is necassary to filter the candidates
    localStorage.setItem("partyFilter", x);
    window.location.href = "/candidates";
  };

  render() {
    return (
      <div role="main" aria-labelledby="title">
        <Helmet>
          <title>Filter candidates</title>
        </Helmet>
        <div id="title" className="screen-container">
          <h1>Election for members of European Parliament</h1>
          <h2>Choose the candidates you want to see on your ballot</h2>
          {/* Display buttons to view all candidates ir filter by party */}
          <button
            className="button first"
            onClick={() => this.goToCandidates(0)}
          >
            View all candidates
          </button>
          <button
            className="button yellow-border"
            onClick={() => this.goToCandidates(1)}
          >
            View Party 1 candidates only
          </button>
          <button
            className="button pink-border"
            onClick={() => this.goToCandidates(2)}
          >
            View Party 2 candidates only
          </button>
          <button
            className="button orange-border"
            onClick={() => this.goToCandidates(3)}
          >
            View Party 3 candidates only
          </button>
          <button
            className="button green-border"
            onClick={() => this.goToCandidates(4)}
          >
            View Party 4 candidates only
          </button>
        </div>

        {/* Navigation section */}
        <div className="nav-container" role="navigation">
          <button className="nav-btn hidden" aria-hidden="true"></button>
          <button
            className="nav-btn"
            onClick={() => (window.location.href = "/help")}
          >
            Help
          </button>
          <button
            className="nav-btn"
            onClick={() => (window.location.href = "/review")}
          >
            Review Vote
          </button>
          <button
            className="nav-btn"
            onClick={() => (window.location.href = "/castVote")}
          >
            Cast Vote
          </button>
        </div>
      </div>
    );
  }
}

export default Filter;
