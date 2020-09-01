import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Player, ControlBar, ReplayControl, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";
import "./helpStyles.css";
import assign from "../helpvideos/assignPreference.mp4";
import undo from "../helpvideos/undo.mp4";
import review from "../helpvideos/review.mp4";
import deleteAssignment from "../helpvideos/delete.mp4";
import edit from "../helpvideos/upDown.mp4";
import reset from "../helpvideos/reset.mp4";
import cast from "../helpvideos/cast.mp4";

class Help extends Component {
  state = {
    showVideo: "none"
  };

  render() {
    if (this.state.showVideo === "none") {
      return (
        <div>
          <Helmet>
            <title>Help</title>
          </Helmet>
          <div className="page-title">
            <h1>Help</h1>
          </div>

          <h2>
            Tap on one of the following tasks to be shown a video tutorial on
            how to accomplish it
          </h2>
          <ul>
            <li onClick={() => this.setState({ showVideo: "assign" })}>
              Assign a preference to a candidate
            </li>
            <li onClick={() => this.setState({ showVideo: "undo" })}>
              Undo your latest preference assignment
            </li>
            <li onClick={() => this.setState({ showVideo: "review" })}>
              Review your assigned candidates
            </li>
            <li
              onClick={() => this.setState({ showVideo: "deleteAssignment" })}
            >
              Delete a preference
            </li>
            <li onClick={() => this.setState({ showVideo: "edit" })}>
              Edit your assigned candidates
            </li>
            <li onClick={() => this.setState({ showVideo: "reset" })}>
              Delete all your assignments
            </li>
            <li onClick={() => this.setState({ showVideo: "cast" })}>
              Cast your vote
            </li>
          </ul>
          <div className="nav-bar" role="navigation">
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/")}
            >
              Go to list of candidates
            </button>
          </div>
        </div>
      );
    } else if (this.state.showVideo === "assign") {
      return (
        <div className="video" role="main">
          <Player playsInline src={assign}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="control-bar">
              <ReplayControl seconds={5} order={2.1} />
            </ControlBar>
          </Player>
          <div className="nav-bar" role="navigation">
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/help")}
            >
              Back to help page
            </button>
          </div>
        </div>
      );
    } else if (this.state.showVideo === "undo") {
      return (
        <div className="video">
          <Player playsInline src={undo}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="control-bar">
              <ReplayControl seconds={5} order={2.1} />
            </ControlBar>
          </Player>
          <div className="nav-bar" role="navigation">
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/help")}
            >
              Back to help page
            </button>
          </div>
        </div>
      );
    } else if (this.state.showVideo === "review") {
      return (
        <div className="video">
          <Player playsInline src={review}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="control-bar">
              <ReplayControl seconds={5} order={2.1} />
            </ControlBar>
          </Player>
          <div className="nav-bar" role="navigation">
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/help")}
            >
              Back to help page
            </button>
          </div>
        </div>
      );
    } else if (this.state.showVideo === "deleteAssignment") {
      return (
        <div className="video">
          <Player playsInline src={deleteAssignment}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="control-bar">
              <ReplayControl seconds={5} order={2.1} />
            </ControlBar>
          </Player>
          <div className="nav-bar" role="navigation">
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/help")}
            >
              Back to help page
            </button>
          </div>
        </div>
      );
    } else if (this.state.showVideo === "edit") {
      return (
        <div className="video">
          <Player playsInline src={edit}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="control-bar">
              <ReplayControl seconds={5} order={2.1} />
            </ControlBar>
          </Player>
          <div className="nav-bar" role="navigation">
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/help")}
            >
              Back to help page
            </button>
          </div>
        </div>
      );
    } else if (this.state.showVideo === "reset") {
      return (
        <div className="video">
          <Player playsInline src={reset}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="control-bar">
              <ReplayControl seconds={5} order={2.1} />
            </ControlBar>
          </Player>
          <div className="nav-bar" role="navigation">
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/help")}
            >
              Back to help page
            </button>
          </div>
        </div>
      );
    } else if (this.state.showVideo === "cast") {
      return (
        <div className="video">
          <Player playsInline src={cast}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="control-bar">
              <ReplayControl seconds={5} order={2.1} />
            </ControlBar>
          </Player>
          <div className="nav-bar" role="navigation">
            <button
              className="nav-btn"
              onClick={() => (window.location.href = "/help")}
            >
              Back to help page
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Help;
