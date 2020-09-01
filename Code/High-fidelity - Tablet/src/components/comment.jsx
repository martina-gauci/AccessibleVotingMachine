import React, { Component } from "react";
import Alert from "./alert";
import Footer from "./footer";
import casticon from "../icons/vote.png";

class SubmitComment extends Component {
  state = { display: 0 };

  goToFinish() {
    window.location.href = "/finish";
  }

  render() {
    if (this.state.display === 1) {
      return (
        <Alert
          title="Are you sure you want to cast your vote? This action is irreversible."
          btn1="Yes"
          btn1Action={this.goToFinish}
          btn2="No"
          btn2Action={() => (window.location.href = "/submitComment")}
        />
      );
    }

    return (
      <React.Fragment>
        <header>
          <h1 aria-live="assertive">Add a comment to your vote</h1>
          <h2>This can be left empty.</h2>
        </header>
        <main>
          <label htmlFor="comment">Enter your comment</label>
          <i>(This can be left empty)</i>
          <input id="comment" type="text"></input>
          <button
            className="rev-btn"
            id="cast"
            onClick={() => this.setState({ display: 1 })}
          >
            <img className="rev-icon" id="cast-icon" src={casticon} alt="" />
            Cast vote
          </button>
        </main>
        <Footer goBack={() => this.props.history.goBack()} />
      </React.Fragment>
    );
  }
}

export default SubmitComment;
