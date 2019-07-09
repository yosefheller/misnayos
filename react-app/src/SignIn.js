import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Label, Input, Container } from "reactstrap";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = this.state;

    fetch("/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 200) {
        response.json().then(response => {
          this.props.signIn(response);
          this.props.history.push(this.props.prevHistory);
        });
      } else if (response.status === 401) {
        this.setState({ status: response.statusText });
      }
      if (response.status === 400) {
        this.setState({ status: response.statusText });
      }
    });
  }

  render() {
    return (
      <Container>
        {this.state.status && <p>{this.state.status}</p>}
        <Form onSubmit={this.handleSubmit}>
          <Label htmlFor="user_name">Enter your user name</Label>
          <Input
            id="user_name"
            name="user_name"
            type="text"
            onChange={this.handleChange}
          />

          <Label htmlFor="password">Enter your password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={this.handleChange}
          />

          <Button>Sign in!</Button>
        </Form>
      </Container>
    );
  }
}
export default withRouter(SignIn);
