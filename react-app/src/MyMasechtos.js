import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
export default class MyMasechtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  fetchMyMasechtos() {
    fetch("http://localhost:3030/masechtos_learned/" + this.props.userinfo.id)
      .then(response => response.json())
      .then(MyMasechtos => {
        return this.setState(
          { MyMasechtos, loading: false }
          // () => ({ MyMasechtos, loading: false }),
          // () => {
          //   // console.log(this.state);
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
  if(MyMasechto) {
    // console.log(MyMasechto.completed);
    if (MyMasechto.completed === 1) {
      return <p> done</p>;
    } else
      return (
        <div>
          if your are done click here{" "}
          <input
            name={MyMasechto.masechto_name}
            type="checkbox"
            value={MyMasechto.id}
            onChange={this.handleChange}
          />
        </div>
      );
  }
  componentDidMount() {
    this.fetchMyMasechtos();
  }
  handleChange(event) {
    if (event.target.checked) {
      // console.log(event.target.value);
      fetch("http://localhost:3030/masechtos_learned/" + event.target.value, {
        method: "PUT"
      }).then(() => {
        this.fetchMyMasechtos();
      });
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
  dateFormater(oldDate) {
    let newDate = new Date(oldDate);
    return newDate.toDateString();
  }
  // siyum: MyMasechto
  renderMyMasechtos() {
    const MyMasechtos = this.state.MyMasechtos.map(MyMasechto => {
      return (
        <ListGroupItem key={MyMasechto.id}>
          I will learn bln masechto{" "}
          <Link
            to={{
              pathname: "/siyum",
              state: {
                isSignedIn: this.props.isSignedIn,
                userinfo: this.props.userinfo.id,
                siyumId: MyMasechto.siyumId
              }
            }}
          >
            {MyMasechto.masechto_name}
          </Link>{" "}
          in memory of {"   "}
          {MyMasechto.neshama}
          {"   "}
          to complete by
          {"   "}
          {this.dateFormater(MyMasechto.siyum_date)}
          {"    "}
          {this.if(MyMasechto)}
        </ListGroupItem>
      );
    });

    return (
      <div>
        <ListGroup>{MyMasechtos}</ListGroup>
      </div>
    );
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
    } else if (this.state.MyMasechtos) {
      return this.renderMyMasechtos();
    } else {
      return this.renderError();
    }
  }
}
