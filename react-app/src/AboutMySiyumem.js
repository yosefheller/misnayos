import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./mishna.JPG";

class AboutMySiyumem extends Component {
  render() {
    return (
      <div>
        <p>you have to be the siyum creater to access this page </p>

        <img src={logo} alt="logo" height="50%" width="75%" />
      </div>
    );
  }
}

export default AboutMySiyumem;
