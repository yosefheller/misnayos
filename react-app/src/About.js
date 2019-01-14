import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./mishna.JPG";

class About extends Component {
  componentDidMount() {
    this.props.prevHistory(this.props.history.location.pathname);
  }
  render() {
    return (
      <div>
        <p>
          On this site you can create a siyum (a siyum is the completion of a
          portion of torah in our case shas mishnayos) and you can give family
          and friends the siyum id so they to can register and take part .{" "}
        </p>

        <img src={logo} alt="logo" height="50%" width="75%" />
      </div>
    );
  }
}

export default About;
