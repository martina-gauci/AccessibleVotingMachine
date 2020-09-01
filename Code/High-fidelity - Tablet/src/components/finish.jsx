import React, { Component } from "react";

class Finish extends Component {
  render() {
    localStorage.clear();
    return (
      <header>
        <h1 aria-live="assertive">
          Your vote has been cast. Please leave the polling booth.
        </h1>
      </header>
    );
  }
}

export default Finish;
