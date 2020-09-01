import React, { Component } from "react";
import { Helmet } from "react-helmet";
import backicon from "../images/back.png";

class Help extends Component {
  state = { dropdown: 0 };

  render() {
    return (
      <div
        className="screen-container"
        role="main"
        aria-labelledby="page-title"
      >
        <Helmet>
          <title>Help page</title>
        </Helmet>
        <h1 id="page-title">Help</h1>
        <h2>
          Tap on the task you need help fulfilling to make a guide appear below
          it.
        </h2>
        <ul className="help-container" role="main" arie-labelledby="page-title">
          <li
            className="help-section"
            onClick={() => this.setState({ dropdown: 1 })}
            aria-expanded={this.state.dropdown === 1 ? "true" : "false"}
            aria-controls="sect1"
            role="button"
          >
            Filtering candidates by party
          </li>
          <ol
            className={this.state.dropdown === 1 ? "inherit" : "hide-steps"}
            role="region"
            id="sect1"
          >
            <li>Go to the filter page.</li>
            <li>
              If you want to see all the candidates in the election, tap the
              button titled "View all candidates". <br></br>Otherwise, choose to
              view a praticular party's candidates.
            </li>
            <button
              className="help-btn"
              onClick={() => (window.location.href = "/filter")}
            >
              Go to the filter page
            </button>
          </ol>
          <li
            className="help-section"
            onClick={() => this.setState({ dropdown: 2 })}
            aria-expanded={this.state.dropdown === 2 ? "true" : "false"}
            aria-controls="sect2"
            role="button"
          >
            Assigning a preference
          </li>
          <ol
            className={this.state.dropdown === 2 ? "inherit" : "hide-steps"}
            role="region"
            id="sect2"
          >
            <li>Go to the filter page</li>
            <li>
              Choose whether you want to see all the candidates or only those of
              a particular party.
            </li>
            <li>
              Tap on a candidate you would like to assign a preference to.
            </li>
            <li>
              Tap on the preference number you would like to assign to the
              chosen candidate.
            </li>
            <li>
              After these actions you will be redirected to the candidates list
              previously shown.
            </li>
            <button
              className="help-btn"
              onClick={() => (window.location.href = "/filter")}
            >
              Go to the filter page
            </button>
          </ol>
          <li
            className="help-section"
            onClick={() => this.setState({ dropdown: 3 })}
            aria-expanded={this.state.dropdown === 3 ? "true" : "false"}
            aria-controls="sect3"
            role="button"
          >
            Change a candidate's preference
          </li>
          <ol
            className={this.state.dropdown === 3 ? "inherit" : "hide-steps"}
            role="region"
            id="sect3"
          >
            <li>
              Locate the candidate you want to edit in the candidate list.
            </li>
            <li>Tap on the candidate's name.</li>
            <li>
              Tap the new preference number you want to assign to the chosen
              candidate.
            </li>
          </ol>
          <li
            className="help-section"
            onClick={() => this.setState({ dropdown: 4 })}
            aria-expanded={this.state.dropdown === 4 ? "true" : "false"}
            aria-controls="sect4"
            role="button"
          >
            Delete an assigned preference
          </li>
          <ol
            className={this.state.dropdown === 4 ? "inherit" : "hide-steps"}
            role="region"
            id="sect4"
          >
            <li>
              Locate the candidate you want to delete the preference of in the
              candidate list.
            </li>
            <li>Tap on the candidate's name.</li>
            <li>
              At the bottom of the page and to the right of the back button, tap
              the 'Delete Preference' button.
            </li>
            <li>Confirm the deletion of the preference.</li>
          </ol>
          <li
            className="help-section"
            onClick={() => this.setState({ dropdown: 5 })}
            aria-expanded={this.state.dropdown === 5 ? "true" : "false"}
            aria-controls="sect5"
            role="button"
          >
            Assign a preference which is assigned to another candidate
          </li>
          <ol
            className={this.state.dropdown === 5 ? "inherit" : "hide-steps"}
            role="region"
            id="sect5"
          >
            <li>
              First delete or change the preference of the candidate currently
              holding the desired preference
            </li>
            <li>
              This will make the preference available for assignment to the
              desired candidate.
            </li>
          </ol>
          <li
            className="help-section"
            onClick={() => this.setState({ dropdown: 6 })}
            aria-expanded={this.state.dropdown === 6 ? "true" : "false"}
            aria-controls="sect6"
            role="button"
          >
            Review your assigned preferences
          </li>
          <ol
            className={this.state.dropdown === 6 ? "inherit" : "hide-steps"}
            role="region"
            id="sect6"
          >
            <li>At the bottom of the screen you will find a navigation bar.</li>
            <li>
              Loacte the 'Review Vote' button in the navigation bar and tap it.
            </li>
            <li>
              The screen will show the list of assigned candidates in ascending
              order of preference.
            </li>
            <br></br>
            <i>
              The Review Vote Button can be found from all pages except the
              Review Vote Page itself.
            </i>
          </ol>
          <li
            className="help-section"
            onClick={() => this.setState({ dropdown: 7 })}
            aria-expanded={this.state.dropdown === 7 ? "true" : "false"}
            aria-controls="sect7"
            role="button"
          >
            Cast your vote
          </li>
          <ol
            className={this.state.dropdown === 7 ? "inherit" : "hide-steps"}
            role="region"
            id="sect7"
          >
            <li>At the bottom of the screen you will find a navigation bar.</li>
            <li>
              Loacte the 'Cast Vote' button in the navigation bar and tap it.
            </li>
            <li>
              The screen displayed will inform you whether your vote is valid or
              invalid.
            </li>
            <li>
              If your vote is valid, a large black button in the middle of the
              screen appears. Once this button is tapped, the vote is cast and
              no changes can be made.
            </li>
            <li>
              If your vote is invalid, you will be informed of which preferences
              you must assign tp validate your vote.
            </li>
            <br></br>
            <i>
              The Cast Vote Button can be found from all pages except the Cast
              Vote Page itself.
            </i>
          </ol>
        </ul>

        {/* Navigation section */}
        <div className="nav-container" role="navigation">
          <button
            className="nav-btn sml"
            onClick={() => this.props.history.goBack()}
            aria-label="Go back"
          >
            <img
              className="back-icon"
              src={backicon}
              alt="left pointing arrow"
            />
          </button>

          <button className="nav-btn hidden" aria-hidden="true">
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

export default Help;
