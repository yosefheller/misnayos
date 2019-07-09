import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class MySiyumem extends Component {
  state = { loading: true };

  fetchMySiyumem() {
    fetch("/siyumem/" + this.props.userinfo.id)
      .then(response => response.json())
      .then(mySiyumem => {
        return this.setState(
          { mySiyumem, loading: false }
          // () => ({ mySiyumem, loading: false })
          // () => {
          //   console.log("state@@@ ", this.state);
          // }
        );
      })
      .catch(error => {
        console.log(
          "There has been a problem with your fetch operation: ",
          error.message
        );
        return this.setState({ loading: false, error });
      });
  }

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.fetchMySiyumem();
    }
  }

  renderLoading() {
    return <div>Please wait... Loading</div>;
  }

  renderError() {
    return (
      <div>
        OOPS. Unable to load blogs
        <br />
        {this.state.error.message}
      </div>
    );
  }
  // siyum: mySiyum
  rendermySiyumem() {
    const mySiyumem = this.state.mySiyumem.map(mySiyum => {
      // console.log(mySiyum);
      // if (mySiyum.password) {
      // localStorage.setItem(mySiyum.id, mySiyum.password);
      // }

      return (
        <ListGroupItem key={mySiyum.id}>
          {mySiyum.siyum_name} , the url is
          <Link
            to={{
              pathname: "/mysiyum/" + mySiyum.id,
              state: {
                isSignedIn: this.props.isSignedIn,
                userinfo: this.props.userinfo.id,
                mySiyum: mySiyum.id
              }
            }}
          >
            {"  "} http://localhost:3000/mysiyum/{mySiyum.id}
          </Link>
          {"  "}
        </ListGroupItem>
      );
    });

    return <ListGroup>{mySiyumem}</ListGroup>;
  }

  render() {
    if (!this.props.isSignedIn) {
      return (
        <Redirect
          to={{
            pathname: "/signIn"
          }}
        />
      );
    }
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.mySiyumem.length === 0) {
      return (
        <div>
          <h3>You have no siyumem</h3>
        </div>
      );
    } else if (this.state.mySiyumem) {
      return this.rendermySiyumem();
    } else {
      return this.renderError();
    }
  }
}
