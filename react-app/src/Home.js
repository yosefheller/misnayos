import React, { Component } from "react";
import "./App.css";
import { Switch, Route, NavLink, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "reactstrap";
import About from "./About";
import Register from "./Register";
import SignIn from "./SignIn";
import SiyumForm from "./SiyumForm";
import MySiyumem from "./MySiyumem";
import MyMasechtos from "./MyMasechtos";
import AdminSiyum from "./AdminSiyum";
import Siyum from "./Siyum";
import NoMatch from "./NoMatch";
import SiyumById from "./SiyumById";
import logo from "./mishna.JPG";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: localStorage.getItem("isSignedIn") || false,
      user: JSON.parse(localStorage.getItem("user")) || "",
      history: this.props.history.location.pathname
    };
  }
  signIn = user => {
    this.setState({ isSignedIn: true, user: user, logo });
    localStorage.setItem("isSignedIn", true);
    localStorage.setItem("user", JSON.stringify(user));
  };
  signOut = () => {
    this.setState({ isSignedIn: false, user: "" });
    localStorage.clear();
    this.props.history.push("/");
  };
  prevHistory = history => {
    this.setState({ history: history });
  };
  // SiyumById = siyumId => {
  //   this.setState({ siyumId: siyumId });
  // }; SiyumById={this.SiyumById}

  render() {
    return (
      <div>
        <Navbar>
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </NavLink>
          {!this.state.isSignedIn && (
            <NavLink
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              Register{" "}
            </NavLink>
          )}
          {!this.state.isSignedIn && (
            <NavLink
              to="/signIn"
              style={{ textDecoration: "none", color: "black" }}
            >
              Login{" "}
            </NavLink>
          )}
          {this.state.isSignedIn && (
            <NavLink
              to="/siyumForm"
              style={{ textDecoration: "none", color: "black" }}
            >
              Create A Siyum
            </NavLink>
          )}
          {this.state.isSignedIn && (
            <NavLink
              to="/mySiyumem"
              style={{ textDecoration: "none", color: "black" }}
            >
              My Siyumem{" "}
            </NavLink>
          )}
          {this.state.isSignedIn && (
            <NavLink
              to="/myMasechtos"
              style={{ textDecoration: "none", color: "black" }}
            >
              My Masechtos
            </NavLink>
          )}
          {this.state.isSignedIn && (
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "black" }}
              onClick={this.signOut}
            >
              Logout
            </NavLink>
          )}
          {this.state.isSignedIn && (
            <SiyumById
              isSignedIn={this.state.isSignedIn}
              userinfo={this.state.user}
            />
          )}
        </Navbar>
        {this.state.isSignedIn && <p>Hi {this.state.user.user_name}</p>}
        <hr />

        <Switch>
          <Route
            path="/signIn"
            render={props => (
              <SignIn
                {...props}
                isSignedIn={this.state.isSignedIn}
                signIn={this.signIn}
                prevHistory={this.state.history}
              />
            )}
          />
          <Route
            path="/register"
            render={props => (
              <Register
                {...props}
                isSignedIn={this.state.isSignedIn}
                signIn={this.signIn}
                prevHistory={this.state.history}
              />
            )}
          />
          <Route
            path="/siyumForm"
            render={props => (
              <SiyumForm
                {...props}
                isSignedIn={this.state.isSignedIn}
                userinfo={this.state.user}
              />
            )}
          />
          <Route
            path="/mySiyumem"
            render={props => (
              <MySiyumem
                {...props}
                isSignedIn={this.state.isSignedIn}
                userinfo={this.state.user}
              />
            )}
          />
          <Route
            path="/myMasechtos"
            render={props => (
              <MyMasechtos
                {...props}
                isSignedIn={this.state.isSignedIn}
                userinfo={this.state.user}
              />
            )}
          />

          <Route
            path="/siyum/:id"
            render={props => (
              <Siyum
                {...props}
                isSignedIn={this.state.isSignedIn}
                signIn={this.signIn}
                userinfo={this.state.user.id}
                prevHistory={this.prevHistory}
                mySiyum="Home"
              />
            )}
          />
          {/* <Route
            path="/mysiyum/:id"
            render={props => (
              <AdminSiyum
                {...props}
                isSignedIn={this.state.isSignedIn}
                signIn={this.signIn}
                userinfo={this.state.user.id}
                prevHistory={this.prevHistory}
                mySiyum="Home"
              />
            )}
          /> */}
          <Route path="/mysiyum/:id" component={AdminSiyum} />

          <Route
            exact
            path="/"
            render={props => (
              <About {...props} prevHistory={this.prevHistory} />
            )}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(Home);
