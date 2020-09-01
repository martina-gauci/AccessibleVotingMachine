import React, { Component } from "react";
import Footer from "./footer";

class Help extends Component {
  state = { display: 0 };
  render() {
    if (this.state.display === 1) {
      return (
        <React.Fragment>
          <header>
            <h1 aria-live="assertive">
              How to assign a preference to a candidate
            </h1>
          </header>
          <main>
            <ol className="steps-list">
              <li className="steps-item">
                Choose the candidates you want to see on your ballot.
              </li>
              <li className="steps-item">
                Tap on the candidate you want to assign a preference to.
              </li>
              <li className="steps-item">
                Tap on the preference you want to assign to the chosen
                candidate.
              </li>
              <li className="steps-item">
                The chosen preference will appear next to the candidate's name
                in the list of candidates
              </li>
            </ol>
            <button className="help-btn">Watch video tutorial</button>
            <button
              className="help-btn"
              onClick={() => (window.location.href = "/")}
            >
              Start voting
            </button>
          </main>
          <Footer goBack={() => (window.location.href = "/help")} />
        </React.Fragment>
      );
    } else if (this.state.display === 2) {
      return (
        <React.Fragment>
          <header>
            <h1 aria-live="assertive">How to make changes to your vote</h1>
            <h2>
              The subsections below show the different ways to edit your vote.
            </h2>
          </header>
          <main className="help-container">
            <h3 className="help-subheading">
              Assign a different preference to a candidate from the candidates'
              list
            </h3>
            <ol className="steps-list">
              <li className="steps-item">
                From the list of candidates, choose the candidate you want to
                make changes to.
              </li>
              <li className="steps-item">
                Choose a different preference to assign to the candidate.
              </li>
            </ol>
            <h3 className="help-subheading">
              Assign a different preference to a candidate from the Review page
            </h3>
            <ol className="steps-list">
              <li className="steps-item">
                Tap on 'Review and cast your vote' at the bottom right of the
                screen.
              </li>
              <li className="steps-item">
                Find the candidate whose preference you want to delete.
              </li>
              <li className="steps-item">
                Tap on the upwards arrow or the downwards arrow in line with
                that candidate. This will increase or decrease the preference by
                one respectively.
              </li>
              <li className="steps-item">
                A message will inform you if this will make any changes to other
                candidates.
              </li>
              <li className="steps-item">Confirm the changes.</li>
              <li className="steps-item">The changes can now be viewed.</li>
            </ol>
            <button className="help-btn">Watch video tutorial</button>
          </main>
          <Footer goBack={() => (window.location.href = "/help")} />
        </React.Fragment>
      );
    } else if (this.state.display === 3) {
      return (
        <React.Fragment>
          <header>
            <h1 aria-live="assertive">How to delete a preference</h1>
          </header>
          <main>
            <ol className="steps-list">
              <li className="steps-item">
                Tap on 'Review and cast your vote' at the bottom right of the
                screen.
              </li>
              <li className="steps-item">
                Find the candidate whose preference you want to delete.
              </li>
              <li className="steps-item">
                Tap on the delete button in line with that candidate. The delete
                button is depicted as a red box with a cross
              </li>
              <li className="steps-item">Confirm deletion.</li>
              <li className="steps-item">
                The candidate will not be displayed when reviewing your vote.
              </li>
            </ol>
            <button className="help-btn">Watch video tutorial</button>
          </main>
          <Footer goBack={() => (window.location.href = "/help")} />
        </React.Fragment>
      );
    } else if (this.state.display === 4) {
      return (
        <React.Fragment>
          <header>
            <h1 aria-live="assertive">How to delete all preference</h1>
          </header>
          <main>
            <ol className="steps-list">
              <li className="steps-item">
                Tap on 'Review and cast your vote' at the bottom right of the
                screen.
              </li>
              <li className="steps-item">
                Tap on 'Start over' below the list of candidates.
              </li>
              <li className="steps-item">
                Comfirm that you want to delete all your preferences.
              </li>
              <li className="steps-item">
                No candidates will be shown since all preferences have been
                deleted.
              </li>
            </ol>
            <button className="help-btn">Watch video tutorial</button>
          </main>
          <Footer goBack={() => (window.location.href = "/help")} />
        </React.Fragment>
      );
    } else if (this.state.display === 5) {
      return (
        <React.Fragment>
          <header>
            <h1 aria-live="assertive">How to review your vote</h1>
            <h2>
              The steps below will guide you to viewing the preference you have
              already assigned.
            </h2>
          </header>
          <main>
            <ol className="steps-list">
              <li className="steps-item">
                Tap on 'Review and cast your vote' at the bottom right of the
                screen.
              </li>
              <li className="steps-item">
                The candidates you have assigned a preference to will be listed
                in order of preference.
              </li>
              <li className="steps-item">
                A message will be displayed if you have not assigned a
                preference.{" "}
              </li>
            </ol>
            <button className="help-btn">Watch video tutorial</button>
          </main>
          <Footer goBack={() => (window.location.href = "/help")} />
        </React.Fragment>
      );
    } else if (this.state.display === 6) {
      return (
        <React.Fragment>
          <header>
            <h1 aria-live="assertive">How to cast your vote</h1>
            <h2>
              Casting your vote is irreversible. Make sure you are casting your
              intended vote.
            </h2>
          </header>
          <main>
            <ol className="steps-list">
              <li className="steps-item">
                Tap on 'Review and cast your vote' at the bottom right of the
                screen.
              </li>
              <li className="steps-item">
                Check that all the candidates are assigned the correct
                preferences.
              </li>
              <li className="steps-item">
                Tap on 'Cast vote' below the list of candidates.
              </li>
              <li className="steps-item">
                If your vote is valid, you will be asked for confirmation. Once
                you confirm, your vote is cast and you can leave.
              </li>
              <li className="steps-item">
                If your vote is invalid, you will be asked to validate your vote
                before casting it. The screen will instruct you on which
                preferences need to be assigned in order to validate the vote.
              </li>
            </ol>
            <button className="help-btn" style={{ marginTop: 0 }}>
              Watch video tutorial
            </button>
          </main>
          <Footer goBack={() => (window.location.href = "/help")} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <header aria-live="assertive">
          <h1>Help</h1>
          <h2>Select the task you need help with</h2>
        </header>
        <main>
          <ol className="help-list">
            <li
              className="help-item"
              role="button"
              onClick={() => this.setState({ display: 1 })}
            >
              Assign a preference to a candidate
            </li>
            <li
              className="help-item"
              role="button"
              onClick={() => this.setState({ display: 2 })}
            >
              Make changes to your vote
            </li>
            <li
              className="help-item"
              role="button"
              onClick={() => this.setState({ display: 3 })}
            >
              Delete a preference
            </li>
            <li
              className="help-item"
              role="button"
              onClick={() => this.setState({ display: 4 })}
            >
              Delete all preferences
            </li>
            <li
              className="help-item"
              role="button"
              onClick={() => this.setState({ display: 5 })}
            >
              Review your vote
            </li>
            <li
              className="help-item"
              role="button"
              onClick={() => this.setState({ display: 6 })}
            >
              Cast your vote
            </li>
          </ol>
        </main>
        <Footer goBack={() => this.props.history.goBack()} />
      </React.Fragment>
    );
  }
}

export default Help;
