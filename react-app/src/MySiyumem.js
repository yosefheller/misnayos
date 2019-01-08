import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class MySiyumem extends Component {
  state = { loading: true };

  fetchMySiyumem() {
    fetch("http://localhost:3030/siyumem/" + this.props.userinfo.id)
      .then(response => response.json())
      .then(mySiyumem => {
        // console.log(mySiyumem);
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
    this.fetchMySiyumem();
    // console.log(this.props.isSignedIn);
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
      return (
        <ListGroupItem key={mySiyum.id}>
          <Link
            to={{
              pathname: "/siyum",
              state: {
                isSignedIn: this.props.isSignedIn,
                userinfo: this.props.userinfo.id,
                siyumId: mySiyum.id
              }
            }}
          >
            {mySiyum.siyum_name}
          </Link>
          {"  "}
          {mySiyum.id}
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
    } else if (this.state.mySiyumem) {
      return this.rendermySiyumem();
    } else {
      return this.renderError();
    }
  }
}
