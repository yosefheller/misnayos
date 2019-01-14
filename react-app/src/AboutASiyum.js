import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./mishna.JPG";

class AboutASiyum extends Component {
  render() {
    return (
      <div>
        <p>Sign In Or Register and take part in the siyum. </p>

        <img src={logo} alt="logo" height="50%" width="75%" />
      </div>
    );
  }
}

export default AboutASiyum;
