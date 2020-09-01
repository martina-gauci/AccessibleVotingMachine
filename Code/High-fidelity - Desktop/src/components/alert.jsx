import React, { Component } from "react";
import crossicon from "../icons/cross.png";
import tickicon from "../icons/tick.png";

class Alert extends Component {
  // state = {  }
  render() {
    return (
      <alert className="alert">
        <h1 aria-live="assertive">{this.props.title}</h1>
        <button
          className="alert-btn green-alert"
          onClick={this.props.btn1Action}
        >
          <img className="delete-icon" alt="" src={tickicon} />
          {this.props.btn1}
        </button>
        <button className="alert-btn red-alert" onClick={this.props.btn2Action}>
          <img className="delete-icon" alt="" src={crossicon} />
          {this.props.btn2}
        </button>
      </alert>
    );
  }
}

export default Alert;
