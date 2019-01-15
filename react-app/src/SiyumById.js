import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
class SiyumById extends Component {
  constructor(props) {
    super(props);
    this.state = { siyumId: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.state.siyumId);
  }
  link() {
    if (this.state.siyumId) {
      return "/siyum/" + this.state.siyumId;
    }
    return "/";
  }
  render() {
    return (
      <div>
        Enter A Siyum Id{" "}
        <input
          id="siyumId"
          name="siyumId"
          type="number"
          onChange={this.handleChange}
          style={{ width: 55 }}
        />{" "}
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={{
            pathname: this.link(),
            state: {
              isSignedIn: this.props.isSignedIn,
              userinfo: this.props.userinfo.id,
              mySiyum: "SiyumById"
            }
          }}
        >
          Get The Siuym
        </Link>
      </div>
    );
  }
}
export default withRouter(SiyumById);
